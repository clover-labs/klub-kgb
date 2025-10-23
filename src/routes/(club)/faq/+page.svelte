<script lang="ts">
  import type { FAQ, FAQSection } from "$lib/types";
  import { Button } from "$lib/components/ui/button";
  import Chip from "$lib/components/ui/chip/chip.svelte";
  import * as Command from "$lib/components/ui/command";
  import * as Empty from "$lib/components/ui/empty";
  import Input from "$lib/components/ui/input/input.svelte";
  import * as Select from "$lib/components/ui/select";
  import TableOfContents from "$lib/components/TableOfContents.svelte";
  import type { PageData } from "./$types";
  import * as m from "$lib/paraglide/messages";
  import { slide } from "svelte/transition";

  let { data }: { data: PageData } = $props();
  const { faqs } = data;

  // State for accordion sections
  let expandedQuestion: string | null = $state(null);
  let searchQuery: string = $state("");

  function toggleQuestion(id: string) {
    expandedQuestion = expandedQuestion === id ? null : id;
  }

  // Category metadata for display
  const categoryMeta: Record<string, { title: string; icon: string }> = {
    dogodki: {
      title: "Dogodki",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    "sedezi-mize": {
      title: "Sedeži, mize, rezervacije",
      icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
    },
    "nastopi-najem": {
      title: "Nastopi in najem prostora",
      icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
    },
  };

  // Group FAQs by category
  const faqSections: FAQSection[] = $derived.by(() => {
    const grouped = faqs.reduce((acc: any, faq: FAQ) => {
      if (!acc[faq.category]) {
        acc[faq.category] = {
          id: faq.category,
          ...categoryMeta[faq.category],
          questions: [],
        };
      }
      acc[faq.category].questions.push(faq);
      return acc;
    }, {});
    return Object.values(grouped);
  });

  // Most asked questions (featured FAQs)
  const mostAskedFaqs = $derived.by(() => {
    return faqs.filter((faq: FAQ) => faq.is_featured).slice(0, 4);
  });

  // Derived state for search filtering
  let filteredSections = $derived.by(() => {
    if (!searchQuery.trim()) return faqSections;

    const query = searchQuery.toLowerCase();
    return faqSections
      .map((section) => ({
        ...section,
        questions: section.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(query) ||
            q.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.questions.length > 0);
  });

  // Form state
  let formData = $state({
    name: "",
    email: "",
    topic: "",
    question: "",
  });
  let submitStatus: "idle" | "submitting" | "success" | "error" =
    $state("idle");

  async function handleSubmit(e: Event) {
    e.preventDefault();
    submitStatus = "submitting";

    try {
      // TODO: Replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      submitStatus = "success";
      formData = { name: "", email: "", topic: "", question: "" };
    } catch (error) {
      submitStatus = "error";
    }
  }

  // Scroll to section
  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Find FAQ by slug
  function findFAQ(slug: string) {
    const faq = faqs.find((f: FAQ) => f.slug === slug);
    if (faq && faq.category) {
      const section = faqSections.find((s: any) => s.id === faq.category);
      return { section, question: faq };
    }
    return null;
  }

  // ToC sections for TableOfContents component
  const tocSections = $derived.by(() =>
    faqSections.map((section) => ({
      id: section.id,
      title: section.title,
      color: section.color,
    }))
  );
</script>

<svelte:head>
  <title>Pogosta vprašanja - Klub KGB Maribor</title>
  <meta
    name="description"
    content="Odgovori na najpogostejša vprašanja o dogodkih, rezervacijah, nastopih in najemu prostora v Klubu KGB Maribor"
  />
</svelte:head>

<!-- Table of Contents -->
<TableOfContents sections={tocSections} />

<main class="flex flex-col md:gap-8 gap-4 -mt-23">
  <!-- Hero Section -->
  <section
    class="h-140 pb-4 px-4 md:px-0 md:pb-0 md:h-100 flex flex-col justify-end md:justify-center items-center md:gap-6 gap-2 border-b-1 border-gray-200 md:h-[60vh] md:bg-cover bg-left bg-no-repeat bg-size-[250%]"
    style="background-image: url('/heroes/club.png');"
  >
    <h1
      class="w-full text-prototype-orange-500 text-3xl lg:text-6xl font-bold font-calluna-sans-bold text-center uppercase"
    >
      <span class="text-pitch-black-100">Pogosta</span>
      Vprašanja
    </h1>
    <p
      class="w-full sm:max-w-1/3 text-lg lg:text-2xl font-calluna-sans-light text-center"
    >
      Vse, kar vas zanima o Klubu KGB
    </p>
  </section>

  <!-- Search Bar -->
  <section class="w-full px-4 md:px-12">
    <div class="mx-auto max-w-7xl flex flex-col gap-4">
      <!-- Search Bar -->
      <Command.Root
        class="rounded-full md:min-w-[450px] border-1 border-slate-300 shadow-sm"
      >
        <Command.Input bind:value={searchQuery} />
      </Command.Root>
    </div>
  </section>

  <!-- Combined Topics & Most Asked Questions -->
  {#if !searchQuery}
    <section class="w-full">
      <div class="mx-auto max-w-7xl flex flex-col gap-4 px-4 md:px-0">
        <div class="flex flex-wrap gap-3">
          {#each faqSections as section}
            <Chip
              label={section.title}
              onClick={() => scrollToSection(section.id)}
              isActive={false}
            />
          {/each}
        </div>

        <!-- Most Asked Questions -->
        {#if mostAskedFaqs.length > 0}
          <div>
            <h2 class="text-2xl font-calluna-sans-bold text-pitch-black-100">
              Najpogostejša vprašanja
            </h2>
            <div class="grid gap-4 md:grid-cols-2">
              {#each mostAskedFaqs as faq}
                <button
                  onclick={() => {
                    scrollToSection(faq.category);
                    setTimeout(() => toggleQuestion(faq.slug), 300);
                  }}
                  class="flex items-start gap-3 rounded-lg bg-white p-4 text-left shadow transition-all hover:shadow-md"
                >
                  <svg
                    class="mt-1 h-5 w-5 flex-shrink-0 text-brick-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span class="font-calluna-sans-semibold text-pitch-black-100">
                    {faq.question}
                  </span>
                </button>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </section>
  {/if}

  <!-- FAQ Sections -->
  <section class="w-full mt-4 md:mt-0">
    <div class="mx-auto max-w-7xl flex flex-col gap-4 px-4 md:px-0">
      {#if filteredSections.length === 0}
        <Empty.Root>
          <Empty.Header>
            <Empty.Media variant="default">
              <svg
                class="mb-4 h-16 w-16 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
            </Empty.Media>
            <Empty.Title>Ni rezultatov</Empty.Title>
            <Empty.Description>
              {#if searchQuery.trim()}
                Poskusite z drugimi iskalnimi pojmi ali postavite vprašanje
                spodaj
              {:else}
                Poskusite z drugimi iskalnimi pojmi ali postavite vprašanje
                spodaj
              {/if}
            </Empty.Description>
          </Empty.Header>
          {#if searchQuery.trim()}
            <Empty.Content>
              <Button
                onclick={() => (searchQuery = "")}
                variant="brick-red"
                size="sm">{m.events_reset_filters()}</Button
              >
            </Empty.Content>
          {/if}
        </Empty.Root>
      {:else}
        {#each filteredSections as section}
          <div id={section.id} class="mb-12 scroll-mt-24">
            <div class="mb-6 flex items-center gap-3">
              <div class="rounded-full bg-pitch-black-100 p-2 md:p-3">
                <svg
                  class="size-4 md:size-6 text-really-white-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d={section.icon}
                  />
                </svg>
              </div>
              <h2
                class="md:text-3xl text-2xl md:font-calluna-sans-bold font-calluna-sans-semibold text-pitch-black-100"
              >
                {section.title}
              </h2>
            </div>

            <div class="space-y-4">
              {#each section.questions as question}
                <div class="overflow-hidden rounded-lg shadow-card">
                  <button
                    onclick={() => toggleQuestion(question.slug)}
                    class="flex w-full items-center cursor-pointer justify-between p-6 text-left transition-colors duration-300 hover:bg-off-white-100/70"
                  >
                    <h3
                      class="font-calluna-sans-light text-pitch-black-100 pr-4"
                    >
                      {question.question}
                    </h3>
                    <svg
                      class="h-6 w-6 flex-shrink-0 transform text-gray-400 transition-transform {expandedQuestion ===
                      question.slug
                        ? 'rotate-180'
                        : ''}"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {#if expandedQuestion === question.slug}
                    <div
                      in:slide
                      out:slide
                      class="border-t border-gray-200 bg-gray-50 p-6"
                    >
                      <!-- Main Answer -->
                      <div
                        class="prose prose-sm max-w-none font-calluna-sans-light text-gray-700 leading-relaxed
												    prose-p:leading-relaxed
												       prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4 prose-ul:space-y-2
												       prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4 prose-ol:space-y-2
												       prose-li:ml-0 prose-li:pl-1
												       prose-strong:font-calluna-sans-semibold prose-strong:text-pitch-black-100
												       prose-headings:font-calluna-sans-bold prose-headings:text-pitch-black-100 prose-headings:mb-3"
                        style="white-space: pre-wrap;"
                      >
                        {@html question.answer}
                      </div>

                      <!-- Callout Boxes -->
                      {#if question.important_note}
                        <div
                          class="mt-4 rounded-lg bg-prototype-orange-500/20 border-l-4 border-prototype-orange-500 p-4"
                        >
                          <div class="flex items-start gap-3 relative">
                            <svg
                              class="size-4 md:size-6 flex-shrink-0 text-prototype-orange-500 absolute top-0 right-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                            <div class="flex-1">
                              <p
                                class="font-calluna-sans-semibold text-pitch-black-200/90"
                              >
                                Pomembno
                              </p>
                              <p
                                class="text-sm font-calluna-sans-light text-gray-700"
                              >
                                {question.important_note}
                              </p>
                            </div>
                          </div>
                        </div>
                      {/if}

                      {#if question.warning_note}
                        <div
                          class="mt-4 rounded-lg bg-brick-red-500/20 border-l-4 border-brick-red-500 p-4"
                        >
                          <div class="flex items-start gap-3 relative">
                            <svg
                              class="size-4 md:size-6 flex-shrink-0 text-brick-red-500 absolute top-0 right-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <div class="flex-1">
                              <p
                                class="font-calluna-sans-semibold text-pitch-black-200/90"
                              >
                                Opozorilo
                              </p>
                              <p
                                class="text-sm font-calluna-sans-light text-gray-700"
                              >
                                {question.warning_note}
                              </p>
                            </div>
                          </div>
                        </div>
                      {/if}

                      {#if question.tip_note}
                        <div
                          class="mt-4 rounded-lg bg-mean-green-500/20 border-l-4 border-mean-green-500 p-4"
                        >
                          <div class="flex items-start gap-3 relative">
                            <svg
                              class="size-4 md:size-6 flex-shrink-0 text-mean-green-500 absolute top-0 right-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                              />
                            </svg>
                            <div class="flex-1">
                              <p
                                class="font-calluna-sans-semibold text-pitch-black-200/90"
                              >
                                Namig
                              </p>
                              <p
                                class="text-sm font-calluna-sans-light text-gray-700"
                              >
                                {question.tip_note}
                              </p>
                            </div>
                          </div>
                        </div>
                      {/if}

                      {#if question.info_note}
                        <div
                          class="mt-4 rounded-lg bg-gray-100 border-l-4 border-gray-400 p-4"
                        >
                          <div class="flex items-start gap-3 relative">
                            <svg
                              class="size-4 md:size-6 flex-shrink-0 text-gray-600 absolute top-0 right-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <div class="flex-1">
                              <p
                                class="font-calluna-sans-semibold text-pitch-black-200/90"
                              >
                                Informacija
                              </p>
                              <p
                                class="text-sm font-calluna-sans-light text-gray-700"
                              >
                                {question.info_note}
                              </p>
                            </div>
                          </div>
                        </div>
                      {/if}
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </section>

  <!-- Related Pages -->
  <section class="w-full">
    <div class="mx-auto max-w-7xl flex flex-col gap-4 px-4 md:px-0">
      <h2 class="text-2xl font-calluna-sans-bold text-pitch-black-100">
        Koristne povezave
      </h2>
      <div class="flex flex-wrap gap-3">
        <a href="/venue-rental">
          <Chip label="Najem prostora" onClick={() => {}} isActive={false}>
            <svg
              class="h-5 w-5 text-pitch-black-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </Chip>
        </a>

        <a href="/venue">
          <Chip label="O prostoru" onClick={() => {}} isActive={false}>
            <svg
              class="h-5 w-5 text-pitch-black-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </Chip>
        </a>
      </div>
    </div>
  </section>

  <!-- Contact Form -->
  <section class="w-full flex flex-col items-start mt-4 md:mt-0">
    <div class="mx-auto max-w-7xl w-full px-4 md:px-0 rounded-lg">
      <div class="rounded-lg p-4 md:p-8 shadow-card">
        <h2
          class="md:text-2xl text-xl md:font-calluna-sans-bold font-calluna-sans-semibold text-pitch-black-100"
        >
          Niste našli odgovora?
        </h2>

        {#if submitStatus === "success"}
          <div class="rounded-lg bg-mean-green-500/20 p-4">
            <div class="flex items-center gap-2">
              <svg
                class="h-5 w-5 text-mean-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p class="font-calluna-sans-semibold text-pitch-black-100">
                Hvala! Vaše vprašanje je bilo poslano.
              </p>
            </div>
            <p class="mt-2 text-sm font-calluna-sans-light text-gray-700">
              Odgovorili vam bomo v najkrajšem možnem času.
            </p>
          </div>
        {/if}

        {#if submitStatus === "error"}
          <div class="rounded-lg bg-brick-red-500/20 p-4">
            <div class="flex items-center gap-2">
              <svg
                class="h-5 w-5 text-brick-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <p class="font-calluna-sans-semibold text-pitch-black-100">
                Napaka pri pošiljanju
              </p>
            </div>
            <p class="mt-2 text-sm font-calluna-sans-light text-gray-700">
              Prišlo je do napake. Prosimo, poskusite znova ali nas
              kontaktirajte direktno.
            </p>
          </div>
        {/if}

        <form onsubmit={handleSubmit} class="flex flex-col gap-4">
          <div class="grid gap-4 md:grid-cols-2">
            <div class="flex flex-col gap-2">
              <label
                for="name"
                class="font-calluna-sans-semibold text-pitch-black-100"
                >Ime *</label
              >
              <Input
                bind:value={formData.name}
                required
                placeholder="Vaše ime"
                name="name"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label
                for="email"
                class="font-calluna-sans-semibold text-pitch-black-100"
                >E-pošta *</label
              >
              <Input
                type="email"
                bind:value={formData.email}
                required
                placeholder="vaš@email.com"
                name="email"
              />
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <label
              for="topic"
              class="font-calluna-sans-semibold text-pitch-black-100"
              >Tema vprašanja *</label
            >
            <Select.Root
              bind:value={formData.topic}
              required
              type="single"
              name="topic"
            >
              <Select.Trigger>
                {formData.topic || "Izberite temo"}
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="dogodki">Dogodki</Select.Item>
                <Select.Item value="nastop">Nastop</Select.Item>
                <Select.Item value="rezervacije">Rezervacije</Select.Item>
                <Select.Item value="drugo">Drugo</Select.Item>
              </Select.Content>
            </Select.Root>

            <div class="flex flex-col gap-2">
              <label
                for="question"
                class="font-calluna-sans-semibold text-pitch-black-100"
                >Vaše vprašanje *</label
              >
              <textarea
                bind:value={formData.question}
                required
                rows="4"
                name="question"
                placeholder="Opišite vaše vprašanje..."
                class="rounded-lg border border-slate-400 px-4 py-3 font-calluna-sans-light focus:border-brick-red-500 focus:outline-none focus:ring-2 focus:ring-brick-red-500/20"
              ></textarea>
            </div>

            <Button
              type="submit"
              disabled={submitStatus === "submitting"}
              variant="brick-red"
              size="lg"
            >
              {submitStatus === "submitting"
                ? "Pošiljam..."
                : "Pošlji vprašanje"}
            </Button>
          </div>
        </form>

        <div class="pt-6 text-center md:text-left flex flex-col gap-2">
          <p class="font-calluna-sans-light text-pitch-black-100">
            Ali nas kontaktirajte direktno:
          </p>
          <div
            class="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-6 font-calluna-sans-light text-pitch-black-100"
          >
            <div class="flex items-center gap-2">
              <svg
                class="h-5 w-5 text-pitch-black-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span class="font-calluna-sans-semibold">Splošna vprašanja:</span>
              <a
                href="mailto:info@klub-kgb.si"
                class="text-brick-red-200 hover:underline"
              >
                info@klub-kgb.si
              </a>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="h-5 w-5 text-pitch-black-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              <span class="font-calluna-sans-semibold">Booking:</span>
              <a
                href="mailto:booking@klub-kgb.si"
                class="text-brick-red-200 hover:underline"
              >
                booking@klub-kgb.si
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
