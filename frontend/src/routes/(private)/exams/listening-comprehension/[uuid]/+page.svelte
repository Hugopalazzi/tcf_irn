<script lang="ts">
	import Breadcrumb from '@tcf/lib/components/Molecules/Breadcrumb.svelte';
	import QuestionList from '@tcf/lib/components/Molecules/QuestionList.svelte';
	import ExamTopCard from '@tcf/lib/components/Organisms/ExamTopCard.svelte';
	import ExamWrapper from '@tcf/lib/components/Organisms/ExamWrapper.svelte';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';
	import { m } from '@tcf/lib/paraglide/messages';

	let actualQuestion = $state(12);
</script>

<Breadcrumb
	links={[
		{ label: m['header.dashboard'](), href: '/dashboard' },
		{ label: m['header.exams'](), href: '/exams' },
		{ label: m['recentExams.listeningExam.title'](), href: '/exams/listening-comprehension' }
	]} />

<h1 class="head-title">{m['recentExams.listeningExam.title']()}</h1>

<QuestionList {actualQuestion} />

<FrameCard>
	<ExamWrapper>
		<ExamTopCard {actualQuestion} />
	</ExamWrapper>
</FrameCard>
