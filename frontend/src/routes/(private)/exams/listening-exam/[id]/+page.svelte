<script lang="ts">
	import QuestionStepper from '@tcf/lib/components/Molecules/QuestionStepper.svelte';
	import ExamCard from '@tcf/lib/components/Organisms/ExamCard.svelte';
	import HeadingPage from '@tcf/lib/components/Organisms/HeadingPage.svelte';
	import { t } from '@tcf/lib/helpers/tHelper.js';
	import { createUserExamStepper } from '@tcf/lib/helpers/createUserExamStepperHelper.js';

	const { data } = $props();
	const { questionsData, currentQuestionIndex, userExamId } = data;

	let currentQuestionIndexState = $state(currentQuestionIndex);
	let currentAnswer: string = '';

	const calculatedQuestionData = $derived(() => {
		const currentQuestion = questionsData[currentQuestionIndexState];
		if (!currentQuestion) {
			return {
				id: '',
				title: '',
				choices: [],
				correctAnswer: ''
			};
		}

		const { id, title, choices, correct_answer } = currentQuestion;

		return {
			id,
			title,
			choices:
				choices?.map((choice: string) => ({
					label: choice
				})) || [],
			correctAnswer: correct_answer
		};
	});
	const stepToNext = createUserExamStepper({ questionsData, userExamId });

	const onNextClick = async () => {
		currentQuestionIndexState = stepToNext(currentQuestionIndexState, currentAnswer);
	};

	const onChoiceClick = (label: string) => {
		currentAnswer = label;
	};

	const onTimerEnd = async () => {
		setTimeout(() => {
			currentQuestionIndexState = stepToNext(currentQuestionIndexState, currentAnswer);
		}, 1000);
	};
</script>

<HeadingPage
	title={t('listening-exam')}
	links={[
		{ label: t('header.dashboard'), href: '/dashboard' },
		{ label: t('header.exams'), href: '/exams' },
		{ label: t('listening-exam'), href: '' }
	]} />
<QuestionStepper currentQuestionIndex={currentQuestionIndexState} questionsLength={questionsData.length} />
<ExamCard
	questionData={calculatedQuestionData()}
	currentQuestionIndex={currentQuestionIndexState}
	questionsLength={questionsData.length}
	{onChoiceClick}
	{onNextClick}
	timerProps={{ totalTime: 60, warningThreshold: 10, onTimerEnd }} 
/>
