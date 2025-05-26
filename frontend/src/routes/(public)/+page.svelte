<script lang="ts">
	import { goto } from '$app/navigation';
	import { read } from '$app/server';
	import Button from '@tcf/lib/components/Atoms/Button.svelte';
	import RecentExams from '@tcf/lib/components/Organisms/RecentExams.svelte';

	const obj = {
		listeningExam: {
			title: 'Listening Exam',
			daysAgo: 2,
			grade: 4,
			link: '/exam/listening'
		},
		readingExam: {
			title: 'Reading Exam',
			daysAgo: 5,
			grade: 3,
			link: '/exam/reading'
		},	
		writingExam: {
			title: 'Writing Exam',
			daysAgo: 1,
			grade: 5,
			link: '/exam/writing'
		}
	}
</script>

<div>
	<Button
		onClick={() => {
			goto('/registration');
		}}
		extraClass="centered-submit-button"
		color="primary"
		label="Se créer un compte"></Button>
	<Button
		onClick={() => {
			goto('/login');
		}}
		extraClass="centered-submit-button"
		color="secondary"
		label="Se connecter"></Button>
		<RecentExams title={"Recent Exams"} description={"Quick summary "} exams={obj} />
</div>
