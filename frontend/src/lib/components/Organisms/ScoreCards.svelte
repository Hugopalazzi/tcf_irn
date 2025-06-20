<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import ScoreCardElement, { type ScoreCardElementProps } from '@tcf/lib/components/Molecules/ScoreCardElement.svelte';

	type Props = {
		scores: ScoreCardElementProps[];
	};

	const { scores }: Props = $props();

	const bem = createBEM('score-cards');
</script>

<div class="score-cards-container">
	{#each scores as score}
		<ScoreCardElement {...score} />
	{/each}
</div>

<style lang="scss">
	.score-cards-container {
		display: flex;
		gap: rem(20);
		width: 100%;
	}
</style>
