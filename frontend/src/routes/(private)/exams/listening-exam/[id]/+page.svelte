<script lang="ts">
	import QuestionStepper from '@tcf/lib/components/Molecules/QuestionStepper.svelte';
	import ExamCard from '@tcf/lib/components/Organisms/ExamCard.svelte';
	import ExamHeading from '@tcf/lib/components/Organisms/ExamHeading.svelte';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';
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
	onClick={() => {
		currentQuestionIndex += 1;
	}} />

<!-- {#each data.questions as question}
	<div>
		{JSON.stringify(question, null, 2)}
	</div>
{/each} -->
