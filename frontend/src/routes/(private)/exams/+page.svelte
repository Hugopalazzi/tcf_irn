<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import HeadingPage from '@tcf/lib/components/Organisms/HeadingPage.svelte';
	import ExamsTable from '@tcf/lib/components/Organisms/ExamsTable.svelte';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';
	const { data } = $props();
	const { userExamsHistory } = data;
	// const userExamsHistory = [
	// 	{
	// 		id: '1',
	// 		type: examsEnum.WRITING_EXAM,
	// 		date: 'April 10, 2025',
	// 		score: '18/20',
	// 		level: 'Intermediate',
	// 		duration: '27 Mins',
	// 		statusCode: 'completed',
	// 		progress: 100,
	// 		actions: ['View Results', 'Download', 'Retake']
	// 	},
	// 	{
	// 		id: '2',
	// 		type: examsEnum.WRITING_EXAM,
	// 		date: 'March 25, 2025',
	// 		score: '20/20',
	// 		level: 'Beginner',
	// 		duration: '24 Mins',
	// 		statusCode: 'completed',
	// 		progress: 100,
	// 		actions: ['View Results', 'Download', 'Retake']
	// 	},
	// 	{
	// 		id: '3',
	// 		type: examsEnum.WRITING_EXAM,
	// 		date: 'March 25, 2025',
	// 		score: '16/20',
	// 		level: 'Advanced',
	// 		duration: '13 Mins',
	// 		statusCode: 'pending',
	// 		progress: 67,
	// 		actions: ['Continue Exam']
	// 	},
	// 	{
	// 		id: '4',
	// 		type: examsEnum.WRITING_EXAM,
	// 		date: 'April 2, 2025',
	// 		score: '19/20',
	// 		level: 'Advanced',
	// 		duration: '35 Mins',
	// 		statusCode: 'completed',
	// 		progress: 100,
	// 		actions: ['View Results', 'Download', 'Retake']
	// 	},
	// 	{
	// 		id: '5',
	// 		type: examsEnum.WRITING_EXAM,
	// 		date: 'April 2, 2025',
	// 		score: '19/20',
	// 		level: 'Advanced',
	// 		duration: '35 Mins',
	// 		statusCode: 'completed',
	// 		progress: 100,
	// 		actions: ['View Results', 'Download', 'Retake']
	// 	}
	// ];
</script>

<div>
	<HeadingPage title={m['examHistoryPage.title']()} description={m['examHistoryPage.description']()} />
	<FrameCard title={m['examHistoryPage.card.title']({ number: userExamsHistory.length })} description={m['examHistoryPage.card.description']()}>
		<ExamsTable examData={userExamsHistory} />
	</FrameCard>
</div>
