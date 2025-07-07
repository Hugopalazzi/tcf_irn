<script lang="ts">
	import QuestionStepper from '@tcf/lib/components/Molecules/QuestionStepper.svelte';
	import ExamCard from '@tcf/lib/components/Organisms/ExamCard.svelte';
	import HeadingPage from '@tcf/lib/components/Organisms/HeadingPage.svelte';
	import { t } from '@tcf/lib/helpers/tHelper.js';
	import { createUserExamStepper, finishExam } from '@tcf/lib/helpers/createUserExamStepperHelper.js';
	import Popin from '@tcf/lib/components/Organisms/Popin.svelte';
	import ScoreCards from '@tcf/lib/components/Organisms/ScoreCards.svelte';
	import type { ScoreCardElementProps } from '@tcf/lib/components/Molecules/ScoreCardElement.svelte';
	import { goto } from '$app/navigation';

	const { data } = $props();
	const { questionsData, currentQuestionIndex, userExamId } = data;

	const questionsLength = questionsData.length;
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

	let openFinalExamPopin = $state(false);

	let cards: ScoreCardElementProps[] = $state([]);
	const onNextClick = async () => {
		currentQuestionIndexState = stepToNext(currentQuestionIndexState, currentAnswer);

		if (currentQuestionIndexState === questionsLength - 1) {
			const { score } = await finishExam(userExamId);
			cards = [
				{
					label: t('finalExamPopin.scoreCard.correct'),
					value: score
				},
				{
					label: t('finalExamPopin.scoreCard.bad'),
					value: questionsLength - score
				}
			];
			openFinalExamPopin = true;
		}
	};

	const onChoiceClick = (label: string) => {
		currentAnswer = label;
	};

	const onTimerEnd = async () => {
		setTimeout(() => {
			currentQuestionIndexState = stepToNext(currentQuestionIndexState, currentAnswer);
		}, 1000);
	};

	$effect(() => {
		if (typeof currentQuestionIndexState === 'number') {
			currentAnswer = '';
		}
	});
</script>

<HeadingPage
	title={t('listening-exam')}
	links={[
		{ label: t('header.dashboard'), href: '/dashboard' },
		{ label: t('header.exams'), href: '/exams' },
		{ label: t('listening-exam'), href: '' }
	]} />
<QuestionStepper currentQuestionIndex={currentQuestionIndexState} {questionsLength} />
<ExamCard
	questionData={calculatedQuestionData()}
	currentQuestionIndex={currentQuestionIndexState}
	{questionsLength}
	{onChoiceClick}
	{onNextClick}
	timerProps={{ totalTime: 60, warningThreshold: 10, onTimerEnd }} />

<Popin
	isOpen={openFinalExamPopin}
	title={t('finalExamPopin.title')}
	isClosable={false}
	description={t('finalExamPopin.description')}
	primaryButtonLabel={t('finalExamPopin.dashboardBtnLabel')}
	onPrimaryBtnClick={() => {
		goto('/dashboard');
	}}
	secondaryButtonLabel={t('finalExamPopin.correctionBtnLabel')}
	onSecondaryBtnClick={() => {
		console.log('TODO: Redirect to correction');
	}}>
	<ScoreCards scores={cards}></ScoreCards>
</Popin>
