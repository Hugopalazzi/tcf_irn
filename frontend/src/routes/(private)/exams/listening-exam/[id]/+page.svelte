<script lang="ts">
	import QuestionStepper from '@tcf/lib/components/Molecules/QuestionStepper.svelte';
	import ExamCard from '@tcf/lib/components/Organisms/ExamCard.svelte';
	import HeadingPage from '@tcf/lib/components/Organisms/HeadingPage.svelte';
	import { t } from '@tcf/lib/helpers/tHelper.js';

	const { data } = $props();
	const { questions, currentQuestionIndex, userExamId } = data;
	let currentQuestionIndexState = $state(currentQuestionIndex);
	let currentAnswer: string = '';

	const questionData = $derived(() => {
		const currentQuestion = questions[currentQuestionIndexState].question;
		return {
			id: questions[currentQuestionIndexState].id,
			title: currentQuestion.title,
			choices:
				currentQuestion.choices?.map((choice: string) => ({
					label: choice
				})) || [],
			correctAnswer: currentQuestion.correct_answer
		};
	});

	const onNextClick = async () => {
		const questionsLength = questions.length - 1;
		if (currentQuestionIndexState < questionsLength) {
			const currentQuestion = questionData();
			const { correctAnswer, id: questionId } = currentQuestion;
			const isCorrectAnwser = currentAnswer === correctAnswer;
			currentQuestionIndexState += 1;
			fetch('/api/update-user-exam', {
				method: 'POST',
				body: JSON.stringify({
					currentQuestionIndex: currentQuestionIndexState,
					userExamId: userExamId,
					isCorrectAnswer: isCorrectAnwser,
					answer: currentAnswer || '',
					questionId: questionId
				}),
				headers: { 'Content-Type': 'application/json' }
			})
				.then((response) => response.json())
				.catch((error) => {
					console.log(error);
				});
		} else if (currentQuestionIndexState === questionsLength) {
			console.log('Submit exam');
		}
	};

	const onChoiceClick = (label: string) => {
		currentAnswer = label;
	};

	const onTimerEnd = () => {
		setTimeout(() => {
			currentQuestionIndexState += 1;
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
<QuestionStepper currentQuestionIndex={currentQuestionIndexState} questionsLength={questions.length} />
<ExamCard
	questionData={questionData()}
	currentQuestionIndex={currentQuestionIndexState}
	questionsLength={questions.length}
	{onChoiceClick}
	{onNextClick}
	timerProps={{ totalTime: 60, warningThreshold: 10, onTimerEnd }} />
