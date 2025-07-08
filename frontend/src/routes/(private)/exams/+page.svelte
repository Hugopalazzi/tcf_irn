<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import HeadingPage from '@tcf/lib/components/Organisms/HeadingPage.svelte';
	import ExamsTable from '@tcf/lib/components/Organisms/ExamsTable.svelte';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';
	const { data } = $props();
	const { userExamsHistory } = data;
</script>

<div>
	<HeadingPage title={m['examHistoryPage.title']()} description={m['examHistoryPage.description']()} />
	<FrameCard title={m['examHistoryPage.card.title']({ number: userExamsHistory.length })} description={m['examHistoryPage.card.description']()}>
		<ExamsTable examData={userExamsHistory} />
	</FrameCard>
</div>
