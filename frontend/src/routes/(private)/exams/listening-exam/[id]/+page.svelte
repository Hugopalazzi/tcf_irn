<script lang="ts">
	import QuestionStepper from '@tcf/lib/components/Molecules/QuestionStepper.svelte';
	import BreadcrumbWrapper from '@tcf/lib/components/Organisms/BreadcrumbWrapper.svelte';
	import ExamHeading from '@tcf/lib/components/Organisms/ExamHeading.svelte';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';
	import { t } from '@tcf/lib/helpers/tHelper.js';

	const { data } = $props();

	let currentQuestion = $state(1); // TODO: recup user last answer
</script>

<BreadcrumbWrapper
	links={[
		{ label: t('header.dashboard'), href: '/dashboard' },
		{ label: t('header.exams'), href: '/exams' },
		{ label: t('listening-exam'), href: '' }
	]}>
	<h1 class="head-title">{t('listening-exam')}</h1>
</BreadcrumbWrapper>

<QuestionStepper {currentQuestion} questionsLength={data.questions.length} />

<FrameCard additionalClass="frame--items-centered">
	<ExamHeading {currentQuestion} />
</FrameCard>

<!-- TODO :
{#each data.questions as question}
	<div>
		{JSON.stringify(question, null, 2)}
	</div>
{/each} -->
