<script lang="ts">
	import ChoicesGroup, { type Choice } from '@tcf/lib/components/Molecules/ChoicesGroup.svelte';
	import ExamHeading from '@tcf/lib/components/Organisms/ExamHeading.svelte';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { t } from '@tcf/lib/helpers/tHelper';
	import { ColorsEnum } from '@tcf/models/colors';
	import Button from '@tcf/lib/components/Atoms/Button.svelte';
	import { type TimerProps } from '@tcf/lib/components/Molecules/Timer.svelte';
	import ExamAudio from '@tcf/lib/components/Molecules/ExamAudio.svelte';

	const bem = createBEM('exam-card');

	interface ExamCardProps {
		currentQuestionIndex: number;
		questionsLength: number;
		questionData: { title: string; choices: Choice[]; audioUrl?: string };
		onChoiceClick: (label: string) => void;
		onNextClick: () => void;
		timerProps: TimerProps;
	}

	const { questionData, currentQuestionIndex, questionsLength, onNextClick, onChoiceClick, timerProps }: ExamCardProps = $props();

	let isAlreadyClicked = $state(false);

	const onButtonClick = () => {
		if (isAlreadyClicked) return;
		isAlreadyClicked = true;
		onNextClick();
	};

	$effect(() => {
		currentQuestionIndex;
		isAlreadyClicked = false;
	});
</script>

<FrameCard additionalClass="frame--items-centered">
	<ExamHeading {currentQuestionIndex} {questionsLength} {timerProps} />
	{#if questionData.audioUrl}
		<ExamAudio
			audioUrl={'https://qiqdradhiqihrqinbzzf.supabase.co/storage/v1/object/sign/listening-exams-audios/happy-days-bgm-50sec-224758.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMDFkMzllMi0yNmZjLTQyYTUtYmI2OC04YjA1YTdiNzc0YTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsaXN0ZW5pbmctZXhhbXMtYXVkaW9zL2hhcHB5LWRheXMtYmdtLTUwc2VjLTIyNDc1OC5tcDMiLCJpYXQiOjE3NTA5NjIxMDksImV4cCI6MzE3MTEwOTYyMTA5fQ.mWGsQdYewyYcdhc1fJLSCWg9JAfmI9ai5gZSvNy6JhA'} />
	{/if}
	<div class={bem('content')}>
		<h2 class={bem('question-title')}>{questionData.title}</h2>
		{#if questionData.choices?.length > 0}
			<ChoicesGroup choices={questionData.choices} onClick={onChoiceClick} />
		{/if}
		<Button
			onClick={onButtonClick}
			color={ColorsEnum.PRIMARY}
			disabled={isAlreadyClicked && currentQuestionIndex === questionsLength - 1}
			label={currentQuestionIndex < questionsLength - 1 ? t('examCard.nextQuestionLabel') : t('examCard.submitLabel')} />
	</div>
</FrameCard>

<style lang="scss">
	.exam-card {
		&__content {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: rem(16);
		}

		&__question-title {
			color: #000;
			text-align: center;
			font-size: 40px;
			font-weight: 700;
			line-height: 52px;
			align-self: stretch;
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.exam-card {
			&__content {
				width: auto;
				gap: rem(52);
			}
		}
	}
</style>
