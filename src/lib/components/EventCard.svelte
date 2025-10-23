<script lang="ts">
  import type { BlogPost } from "$lib/types.js";
  import { crossfade, fade } from "svelte/transition";
  import { generateEventUrl } from "$lib/utils/slug";

  let { post }: { post: BlogPost } = $props();

  const [send, receive] = crossfade({
    duration: 300,
    fallback(node) {
      return fade(node, { duration: 400 });
    },
  });

  let isHovered = $state(false);
  const dividedTitleByPluses = $derived(post.title.split("+"));
  const dayAndMonth = $derived(
    new Date(post.event_date)
      .toLocaleDateString("sl-SI", {
        day: "2-digit",
        month: "2-digit",
      })
      .replace(/\./g, "")
  );
  const hour = $derived(
    new Date(post.event_date)
      .toLocaleTimeString("sl-SI", {
        hour: "2-digit",
      })
      .replace(/\./g, "")
  );
</script>

<a href={generateEventUrl(post)} class="cursor-pointer z-[25]">
  <div
    tabindex="0"
    role="dialog"
    class="bg-off-white-100 p-16 w-full h-full relative group border-1 border-slate-300/30 md:min-h-[488px]"
    onmouseenter={() => (isHovered = true)}
    onmouseleave={() => (isHovered = false)}
  >
    <div
      class="absolute inset-0 bg-transparent w-full h-full group-hover:bg-pitch-black-100/60 transition-all duration-300"
    ></div>
    <img
      src={`https://cms.cloverlabs.dev/assets/${post.image}?${post.date_updated || Date.now()}`}
      alt={post.title}
      class="w-full h-full object-cover"
    />

    <!-- Title -->
    {#if !isHovered}
      <div
        class="w-full text-pitch-black-100 absolute top-[12px] left-[3%] flex items-center truncate"
        out:send={{ key: "cezanne-title" }}
        in:receive={{ key: "cezanne-title" }}
      >
        <h3
          class="text-2xl md:text-3xl font-calluna-sans-black max-w-5/6 truncate"
        >
          {dividedTitleByPluses[0].trim()}
          {#if dividedTitleByPluses.length > 1}
            <span class="text-2xl md:text-3xl ml-2 font-calluna-sans-black"
              >+</span
            >
            <div
              class="text-md md:text-lg ml-2 font-calluna-sans-bold leading-tight"
            >
              {#each dividedTitleByPluses[1].trim().split(" ") as word}
                <div>{word}</div>
              {/each}
            </div>
          {/if}
        </h3>
      </div>
    {/if}
    <!-- Day and Month -->
    <div
      class="absolute right-8 top-[15.75rem] rotate-90 origin-right flex items-start justify-start gap-4"
    >
      <span
        class="text-pitch-black-100 text-4xl font-calluna-sans-black mt-1 group-hover:hidden"
        >{dayAndMonth.replace(" ", ".")}</span
      >
      {#if !isHovered}
        <span
          class="text-mean-green-500 text-7xl font-cezanne leading-12 mt-2"
          out:send={{ key: "cezanne-date" }}
          in:receive={{ key: "cezanne-date" }}
          >{dayAndMonth.replace(" ", ".")}</span
        >
      {/if}
    </div>

    <!-- Hour -->
    <div
      class="absolute left-9 -bottom-3 -rotate-90 origin-left flex items-start gap-4"
    >
      <span
        class="text-pitch-black-100 text-5xl font-calluna-sans-black mb-2 group-hover:hidden"
        >{hour}</span
      >
      {#if !isHovered}
        <span
          class="text-mean-green-500 text-7xl font-cezanne leading-12 mt-2"
          out:send={{ key: "cezanne-hour" }}
          in:receive={{ key: "cezanne-hour" }}>{hour}</span
        >
      {/if}
    </div>

    {#if isHovered}
      <!-- Centered Cezanne Text -->
      <div
        class="absolute inset-0 z-10 flex flex-col items-center justify-center"
      >
        <h3
          class="text-off-white-100 text-3xl font-calluna-sans-semibold leading-12 text-center"
          in:receive={{ key: "cezanne-title" }}
          out:send={{ key: "cezanne-title" }}
        >
          {dividedTitleByPluses[0].trim()}
        </h3>
        <span
          class="text-prototype-orange-500 text-4xl font-calluna-sans-semibold leading-12"
          in:receive={{ key: "cezanne-date" }}
          out:send={{ key: "cezanne-date" }}
          >{dayAndMonth.replace(" ", ".")}</span
        >
        <span
          class="text-prototype-orange-500 text-4xl font-calluna-sans-semibold leading-12"
          in:receive={{ key: "cezanne-hour" }}
          out:send={{ key: "cezanne-hour" }}>{hour}</span
        >
      </div>
    {/if}

    <!-- Location -->
    <div
      class="absolute right-2 sm:right-4 bottom-2 origin-right flex items-center gap-2 sm:gap-4 max-w-[70%]"
    >
      <div class="flex flex-col">
        <span
          class="text-pitch-black-100 text-xl font-calluna-sans-bold leading-4"
          >Vojašniški trg 5</span
        >
        <span
          class="text-pitch-black-100 text-xl font-calluna-sans-bold leading-4"
          >2000 Maribor</span
        >
      </div>
      <span
        class="text-pitch-black-100 text-5xl font-calluna-sans-black leading-12"
        >KGB</span
      >
    </div>
  </div>
</a>
