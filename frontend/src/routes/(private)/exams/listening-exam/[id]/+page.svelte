<script lang="ts">
	import QuestionStepper from '@tcf/lib/components/Molecules/QuestionStepper.svelte';
	import ExamHeading from '@tcf/lib/components/Organisms/ExamHeading.svelte';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';
	import HeadingPage from '@tcf/lib/components/Organisms/HeadingPage.svelte';
	import { t } from '@tcf/lib/helpers/tHelper.js';

	const { data } = $props();

	let currentQuestion = $state(1); // TODO: recup user last answer
</script>

<HeadingPage
	title={t('listening-exam')}
	links={[
		{ label: t('header.dashboard'), href: '/dashboard' },
		{ label: t('header.exams'), href: '/exams' },
		{ label: t('listening-exam'), href: '' }
	]} />

<QuestionStepper {currentQuestion} questionsLength={data.questions.length} />

<FrameCard additionalClass="frame--items-centered">
	<ExamHeading {currentQuestion} />
</FrameCard>

<!-- {#each data.questions as question}
	<div>
		{JSON.stringify(question, null, 2)}
	</div>
{/each} -->
