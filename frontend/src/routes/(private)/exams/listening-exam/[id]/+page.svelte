<script lang="ts">
	import QuestionStepper from '@tcf/lib/components/Molecules/QuestionStepper.svelte';
	import BreadcrumbWrapper from '@tcf/lib/components/Organisms/BreadcrumbWrapper.svelte';
	import ExamTopCard from '@tcf/lib/components/Organisms/ExamTopCard.svelte';
	import ExamWrapper from '@tcf/lib/components/Organisms/ExamWrapper.svelte';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';
	import { t } from '@tcf/lib/helpers/tHelper.js';

	const { data } = $props();

	let actualQuestion = $state(1); // TODO: recup user last answer
</script>

<BreadcrumbWrapper
	links={[
		{ label: t('header.dashboard'), href: '/dashboard' },
		{ label: t('header.exams'), href: '/exams' },
		{ label: t('listening-exam'), href: '' }
	]}>
	<h1 class="head-title">{t('listening-exam')}</h1>
</BreadcrumbWrapper>

<QuestionStepper {actualQuestion} questionLength={data.questions.length} />

<FrameCard>
	<ExamWrapper>
		<ExamTopCard {actualQuestion} />
	</ExamWrapper>
</FrameCard>

TODO :
{#each data.questions as question}
	<div>
		{JSON.stringify(question, null, 2)}
	</div>
{/each}
