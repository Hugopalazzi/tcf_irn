<script lang="ts">
	import UserStatCardElement, { type UserStatCardElementProps } from '@tcf/lib/components/Molecules/UserStatCardElement.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import ExperienceCard from '@tcf/lib/components/Molecules/ExperienceCard.svelte';
	import VerticalLineIcon from '@tcf/lib/components/Icons/VerticalLineIcon.svelte';

	type Props = {
		stats: UserStatCardElementProps[];
	};

	const { stats }: Props = $props();

	const bem = createBEM('user-stats-cards');
</script>

<div class={bem('container')}>
	{#each stats as score}
		<UserStatCardElement {...score} />
	{/each}
	<div class={bem('vertical-bar')}>
		<VerticalLineIcon />
	</div>
	<ExperienceCard level={1} experience={20} maxExperience={200} />
</div>

<style lang="scss">
	.user-stats-cards {
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
		.user-stats-cards {
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
