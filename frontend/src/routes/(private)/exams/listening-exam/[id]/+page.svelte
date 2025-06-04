<script lang="ts">
	import Breadcrumb from '@tcf/lib/components/Molecules/Breadcrumb.svelte';
	import QuestionList from '@tcf/lib/components/Molecules/QuestionList.svelte';
	import ExamTopCard from '@tcf/lib/components/Organisms/ExamTopCard.svelte';
	import ExamWrapper from '@tcf/lib/components/Organisms/ExamWrapper.svelte';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';
	import { t } from '@tcf/lib/helpers/tHelper.js';

	const { data } = $props();

	let actualQuestion = $state(12);
</script>

TODO :
{#each data.questions as question}
	<div>
		{JSON.stringify(question, null, 2)}
	</div>
{/each}

<Breadcrumb
	links={[
		{ label: t('header.dashboard'), href: '/dashboard' },
		{ label: t('header.exams'), href: '/exams' },
		{ label: t('listening-exam'), href: '/exams/listening-comprehension' }
	]} />

<h1 class="head-title">{t('listening-exam')}</h1>

<QuestionList {actualQuestion} />

<FrameCard>
	<ExamWrapper>
		<ExamTopCard {actualQuestion} />
	</ExamWrapper>
</FrameCard>
