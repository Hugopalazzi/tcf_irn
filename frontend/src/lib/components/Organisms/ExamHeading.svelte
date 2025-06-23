<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import ProgressBar from '@tcf/lib/components/Atoms/ProgressBar.svelte';
	import Timer, { type TimerProps } from '@tcf/lib/components/Molecules/Timer.svelte';
	import { t } from '@tcf/lib/helpers/tHelper';

	interface ExamHeadingProps {
		currentQuestionIndex: number;
		questionsLength: number;
		timerProps: TimerProps;
	}
	let { currentQuestionIndex, questionsLength, timerProps }: ExamHeadingProps = $props();

	const bem = createBEM('exam-heading');

	const progressPercentage = $derived(Math.floor((currentQuestionIndex / questionsLength) * 100));
</script>

<div class={bem('container')}>
	<div class={bem('content')}>
		<span class={bem('question-number')}>{t('examHeading.questionNumber', { number: currentQuestionIndex + 1 })}</span>
		<div class={bem('progress-bar-wrapper')}>
				<ProgressBar progress={progressPercentage} />
		</div>
		<span class={bem('percentage')}>{t('examHeading.questionPercentage', { percent: progressPercentage })}</span>
	</div>
	{#key currentQuestionIndex}
		<Timer {...timerProps} additionalClass="align-right" />
	{/key}
</div>

<style lang="scss">
	.exam-heading {
		&__container {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
		}

		&__content {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, 1fr);
			grid-column-gap: 0px;
			grid-row-gap: 0px;
		}

		&__question-number,
		&__percentage {
			font-weight: 400;
			color: rgba(0, 0, 0, 0.5);
			white-space: nowrap;
			font-size: rem(14);
		}

		&__question-number {
			grid-area: left;
			justify-self: start;
			grid-area: 2 / 1 / 3 / 2;
		}

		&__progress-bar-wrapper {
			grid-area: 1 / 1 / 2 / 3;
			width: 220px;
		}

		&__percentage {
			grid-area: right;
			justify-self: end;
			grid-area: 2 / 2 / 3 / 3;
		}
	}

	@media (min-width: $breakpoint-tablet) {
		.exam-heading {
			&__content {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 20px;
			}

			&__progress-bar-wrapper {
				width: 550px;
			}
		}
	}
</style>
