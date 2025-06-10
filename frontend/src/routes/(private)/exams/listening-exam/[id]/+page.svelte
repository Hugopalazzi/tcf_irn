<script lang="ts">
	const { data } = $props();
</script>

TODO :
{#each data.questions as question}
	<div>
		{JSON.stringify(question, null, 2)}
	</div>
{/each}
