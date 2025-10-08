<script lang="ts">
	export interface Quote {
		text: string;
		author: string;
	}

	interface Props {
		quotes?: Quote[];
		showAuthor?: boolean;
		className?: string;
	}

	// Default music-themed quotes (mix of famous quotes and Slovenian adaptations)
	const defaultQuotes: Quote[] = [
		{
			text: "One good thing about music, when it hits you, you feel no pain.",
			author: "Bob Marley"
		},
		{
			text: "All music is folk music. I ain't never heard a horse sing a song.",
			author: "Louis Armstrong"
		},
		{
			text: "I'm sick to death of people saying we've made 11 albums that sound exactly the same. In fact, we've made 12 albums that sound exactly the same.",
			author: "Angus Young (AC/DC)"
		},
		{
			text: "I love to sing, and I love to drink scotch. Most people would rather hear me drink scotch.",
			author: "George Burns"
		},
		{
			text: "A gentleman is someone who can play the accordion, but doesn't.",
			author: "Tom Waits"
		},
		{
			text: "Talking about music is like dancing about architecture.",
			author: "Steve Martin"
		},
		{
			text: "When I was a little boy, I told my dad, 'When I grow up, I want to be a musician.' My dad said: 'You can't do both, Son'.",
			author: "Chet Atkins"
		},
		{
			text: "All the good music has already been written by people with wigs and stuff.",
			author: "Frank Zappa"
		},
		{
			text: "My music is best understood by children and animals.",
			author: "Igor Stravinsky"
		},
		{
			text: "Do it again on the next verse, and people think you meant it.",
			author: "Chet Atkins"
		},
		{
			text: "If I didn't do this well, I just wouldn't have anything to do…I can't cook, and I'd be a terrible housewife.",
			author: "Freddie Mercury"
		},
		{
			text: "I don't know anything about music. In my line you don't have to.",
			author: "Elvis Presley"
		},
		{
			text: "I've been imitated so well I've heard people copy my mistakes.",
			author: "Jimi Hendrix"
		},
		{
			text: "I smash guitars because I like them.",
			author: "Pete Townshend"
		},
		// Slovenian-inspired additions
		{
			text: "Življenje je prekratko za slabo glasbo!",
			author: "Klub KGB"
		},
		{
			text: "Če je preglasno, si prestar!",
			author: "Ljudska modrost"
		},
		{
			text: "Glasba je edino zdravilo, ki ga ne predpiše zdravnik.",
			author: "Klub KGB"
		},
		{
			text: "Rock'n'roll nikoli ne umre!",
			author: "Klub KGB"
		}
	];

	let { quotes = defaultQuotes, showAuthor = true, className = '' }: Props = $props();

	// Pick random quote on component mount
	const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
</script>

<blockquote class="font-calluna-sans-light {className}">
	<p class="mb-2 italic text-gray-700">
		"{randomQuote.text}"
	</p>
	{#if showAuthor}
		<footer class="text-sm text-gray-600">
			— <cite class="font-calluna-sans-semibold not-italic">{randomQuote.author}</cite>
		</footer>
	{/if}
</blockquote>
