<script lang="ts">
	import QuestionStepper from '@tcf/lib/components/Molecules/QuestionStepper.svelte';
	import ExamCard from '@tcf/lib/components/Organisms/ExamCard.svelte';
	import HeadingPage from '@tcf/lib/components/Organisms/HeadingPage.svelte';
	import { t } from '@tcf/lib/helpers/tHelper.js';

	const { data } = $props();
	const { questions, currentQuestionIndex, userExamId, sessionAccessToken } = data;
	let currentQuestionIndexState = $state(currentQuestionIndex);

	const questionData = $derived(() => {
		const currentQuestion = questions[currentQuestionIndex].question;
		return {
			title: currentQuestion.title,
			choices: currentQuestion.choices.map((choice: string) => ({
				label: choice
			}))
		};
	});

	const onClickNext = async () => {
		const questionsLength = questions.length - 1;
		if (currentQuestionIndexState < questionsLength) {
			currentQuestionIndexState += 1;

			await fetch('/api/update-user-exam', {
				method: 'POST',
				body: JSON.stringify({
					currentQuestionIndex: currentQuestionIndexState,
					userExamId: userExamId
				}),
				headers: { Authorization: `Bearer ${sessionAccessToken}`, 'Content-Type': 'application/json' }
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
				})
				.catch((error) => {
					console.log(error);
					return [];
				});
		} else if (currentQuestionIndexState === questionsLength) {
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
<QuestionStepper currentQuestionIndex={currentQuestionIndexState} questionsLength={questions.length} />
<ExamCard questionData={questionData()} currentQuestionIndex={currentQuestionIndexState} questionsLength={questions.length} onClick={onClickNext} />

<!-- {#each data.questions as question}
	<div>
		{JSON.stringify(question, null, 2)}
	</div>
{/each} -->
