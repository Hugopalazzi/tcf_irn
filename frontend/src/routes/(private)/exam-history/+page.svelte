<script lang="ts">
	import { goto } from '$app/navigation';
	import RegisterForm from '@tcf/lib/components/Organisms/RegisterForm.svelte';
	import { addErrorToast, addSuccessToast } from '@tcf/lib/helpers/toastHelper.js';
	import { superFormDefaultConfig } from '@tcf/models/forms/commonSchema.js';
	import { userCreationAccountSchema } from '@tcf/models/forms/userSchema';
	import { m } from '$lib/paraglide/messages.js';
	import { superForm, superValidate } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import TitleWithDescription from '@tcf/lib/components/Molecules/TitleWithDescription.svelte';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';
	import { examsEnum } from '@tcf/models/exams.js';
	import {t} from "@tcf/lib/helpers/tHelper";
	import ExamsTable from '@tcf/lib/components/Organisms/ExamsTable.svelte';
	const { data: user } = $props();
	console.log('data', user);
	const examData = [
		{
			type: examsEnum.WRITING_EXAM,
			date: 'April 10, 2025',
			score: '18/20',
			level: 'Intermediate',
			duration: '27 Mins',
			statusCode: 'completed',
			progress: 100,
			actions: ['View Results', 'Download', 'Retake']
		},
		{
			type: examsEnum.WRITING_EXAM,
			date: 'March 25, 2025',
			score: '20/20',
			level: 'Beginner',
			duration: '24 Mins',
			statusCode: 'completed',
			progress: 100,
			actions: ['View Results', 'Download', 'Retake']
		},
		{
			type: examsEnum.WRITING_EXAM,
			date: 'March 25, 2025',
			score: '16/20',
			level: 'Advanced',
			duration: '13 Mins',
			statusCode: 'pending',
			progress: 67,
			actions: ['Continue Exam']
		},
		{
			type: examsEnum.WRITING_EXAM,
			date: 'April 2, 2025',
			score: '19/20',
			level: 'Advanced',
			duration: '35 Mins',
			statusCode: 'completed',
			progress: 100,
			actions: ['View Results', 'Download', 'Retake']
		},
		{
			type: examsEnum.WRITING_EXAM,
			date: 'April 2, 2025',
			score: '19/20',
			level: 'Advanced',
			duration: '35 Mins',
			statusCode: 'completed',
			progress: 100,
			actions: ['View Results', 'Download', 'Retake']
		}
	];
</script>

<div>
	<TitleWithDescription title={m['examHistoryPage.title']()} description={m['examHistoryPage.description']()} />
	<FrameCard title={m['examHistoryPage.card.title']({ number: examData.length })} description={m['examHistoryPage.card.description']()}>
		<ExamsTable {examData} />
		
	</FrameCard>
</div>

<style lang="scss">
	.exam-row {
		background-color: var(--color-bg-secondary);
		border-radius: 8px;
	}
</style>
