<script lang="ts">
	import ScoreCardElement, { type ScoreCardElementProps } from '@tcf/lib/components/Molecules/ScoreCardElement.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';

	type Props = {
		scores: ScoreCardElementProps[];
	};

	const { scores }: Props = $props();

	const bem = createBEM('score-cards');
</script>

<div class={bem('container')}>
	{#each scores as score, i}
		<ScoreCardElement {...score} />
	{/each}
</div>

<style lang="scss">
	.score-cards {
		&__container {
			display: flex;
			gap: rem(8);
			width: 100%;
			align-items: stretch;

			@media (min-width: $breakpoint-desktop) {
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: space-between;
			}
		}
	}
</style>
