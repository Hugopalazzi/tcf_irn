<script lang="ts">
	import ScoreCardElement, { type ScoreCardElementProps } from '@tcf/lib/components/Molecules/ScoreCardElement.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import ExperienceCard from '@tcf/lib/components/Molecules/ExperienceCard.svelte';
	import VerticalLineIcon from '@tcf/lib/components/Icons/VerticalLineIcon.svelte';

	type Props = {
		scores: ScoreCardElementProps[];
	};

	const { scores }: Props = $props();

	const bem = createBEM('score-cards');
</script>

<div class={bem('container')}>
	{#each scores as score}
		<ScoreCardElement {...score} />
	{/each}
	<div class={bem('vertical-bar')}>
		<VerticalLineIcon />
	</div>
	<ExperienceCard level={1} experience={20} maxExperience={200} />
</div>

<style lang="scss">
	.score-cards {
		&__container {
			display: grid;
			grid-template-columns: 1fr 1fr;
			width: 100%;
			gap: rem(12) rem(8);
		}

		&__vertical-bar {
			display: none;
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.score-cards {
			&__container {
				display: flex;
				gap: rem(20);
				align-items: center;
			}

			&__vertical-bar {
				display: block;
			}
		}
	}
</style>
