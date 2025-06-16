<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import type { Snippet } from 'svelte';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';
	import ExamHeading from '@tcf/lib/components/Organisms/ExamHeading.svelte';
	import ChoicesGroup, { type Choice } from '@tcf/lib/components/Molecules/ChoicesGroup.svelte';
	import Button from '../Atoms/Button.svelte';
	import { ColorsEnum } from '@tcf/models/colors';
	import { t } from '@tcf/lib/helpers/tHelper';
	import { derived } from 'svelte/store';

	const bem = createBEM('exam-card');

	interface ExamCardProps {
		currentQuestionIndex: number;
		questionsLength: number;
		questionData: { title: string; choices: Choice[] };
		onClick: () => void;
	}

	const { questionData, currentQuestionIndex = $bindable(), questionsLength, onClick }: ExamCardProps = $props();
</script>

<FrameCard additionalClass="frame--items-centered">
	<ExamHeading {currentQuestionIndex} {questionsLength} />
	<div class={bem('content')}>
		<h2 class={bem('question-title')}>{questionData.title}</h2>
		<ChoicesGroup choices={questionData.choices} />
		<Button
			{onClick}
			color={ColorsEnum.PRIMARY}
			label={currentQuestionIndex < questionsLength - 1 ? t('examCard.nextQuestionLabel') : t('examCard.submitLabel')} />
	</div>
</FrameCard>

<style lang="scss">
	.exam-card {
		&__content {
			width: 100%;
			display: flex;
			flex-direction: column;
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
