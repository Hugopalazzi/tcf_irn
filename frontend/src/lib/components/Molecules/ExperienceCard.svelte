<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { getLevelInfo } from '@tcf/lib/helpers/levelingHelper';
	import { m } from '$lib/paraglide/messages.js';
	import ProgressBar from '@tcf/lib/components/Atoms/ProgressBar.svelte';

	export type ExperienceCardProps = {
		level: number;
		experience: number;
		maxExperience: number;
	};

	const { level, experience, maxExperience }: ExperienceCardProps = $props();
	const bem = createBEM('experience-card');

	const { Icon, title } = $derived(getLevelInfo(level));
</script>

<div class={bem('container')}>
	<div class={bem('level')}>
		<div class={bem('icon')}>
			<Icon />
		</div>
		<div class={bem('title-level')}>
			<span class={bem('title')}>
				{title}
			</span>
			<span class={bem('level-label')}>
				{m['experienceCard.level']()}
				{level}
			</span>
		</div>
	</div>

	<div class={bem('label-bar-container')}>
		<div class={bem('experience-percentage')}>
			<span>{m['experienceCard.xp']()}</span>
			<span class={bem('max-percent')}>{maxExperience}</span>
		</div>
		<ProgressBar filledClass="secondary" emptyClass="opaque-white" progress={(experience / maxExperience) * 100} />
	</div>
</div>

<style lang="scss">
	.experience-card {
		&__container {
			grid-column: 1 / -1;
			display: flex;
			padding: rem(16);
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			flex: 1 0 0;
			color: #fff;
			align-self: stretch;
			border-radius: rem(20);
			gap: rem(12);
			background: linear-gradient(103deg, #ed9d5d 0%, #c56518 100%);
		}

		&__level {
			display: flex;
			align-items: flex-start;
			gap: rem(16);
			align-self: stretch;
			font-size: rem(14);
			font-style: normal;
			font-weight: 500;
			line-height: rem(20);
		}
		&__level-label {
			color: rgba(255, 255, 255, 0.8);
		}
		&__icon {
			display: flex;
			padding: rem(10);
			border-radius: rem(8);
			background: #fff;
			width: rem(24);
			height: rem(24);
			justify-content: center;
			align-items: center;
			gap: rem(10);
		}

		&__title-level {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			gap: rem(4);
			flex: 1 0 0;
		}

		&__title {
			font-size: rem(14);
			font-style: normal;
			font-weight: 600;
		}

		&__label-bar-container {
			display: flex;
			flex-direction: column;
			align-self: stretch;
			gap: rem(8);
		}

		&__experience-percentage {
			display: flex;
			justify-content: space-between;
			font-size: rem(12);
			line-height: rem(16);
		}

		&__max-percent {
			font-weight: 700;
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.experience-card {
			&__container {
				padding: rem(16);
			}

			&__title {
				font-size: rem(16);
				line-height: rem(20);
			}

			&__title-level {
				flex-direction: column;
			}

			&__experience-percentage {
				font-size: rem(16);
				line-height: rem(20);
			}
		}
	}
</style>
