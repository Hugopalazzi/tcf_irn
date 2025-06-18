<script lang="ts">
	import QuestionStepper from '@tcf/lib/components/Molecules/QuestionStepper.svelte';
	import ExamCard from '@tcf/lib/components/Organisms/ExamCard.svelte';
	import HeadingPage from '@tcf/lib/components/Organisms/HeadingPage.svelte';
	import { t } from '@tcf/lib/helpers/tHelper.js';

	const { data } = $props();
	const { questions } = data;
	let currentQuestionIndex = $state(0); // TODO: recup user last answer

	const questionData = $derived(() => {
		const currentQuestion = questions[currentQuestionIndex].question;
		return {
			title: currentQuestion.title,
			choices: currentQuestion.choices.map((choice: string) => ({
				label: choice
			}))
		};
	});

	const onClickNext = () => {
		const questionsLength = questions.length - 1;
		if (currentQuestionIndex < questionsLength) {
			currentQuestionIndex += 1;
		} else if (currentQuestionIndex === questionsLength) {
			console.log('Submit exam');
		}
	};
</script>

<HeadingPage
	title={t('listening-exam')}
	links={[
		{ label: t('header.dashboard'), href: '/dashboard' },
		{ label: t('header.exams'), href: '/exams' },
		{ label: t('listening-exam'), href: '' }
	]} />
<QuestionStepper {currentQuestionIndex} questionsLength={data.questions.length} />
<ExamCard
	questionData={questionData()}
	{currentQuestionIndex}
	questionsLength={questions.length}
	onClick={onClickNext} />

<!-- {#each data.questions as question}
	<div>
		{JSON.stringify(question, null, 2)}
	</div>
{/each} -->
