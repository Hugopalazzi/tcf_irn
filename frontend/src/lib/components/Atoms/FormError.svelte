<script lang="ts">
	export let errors: string[] | string | null | undefined | any;
</script>

{#if errors}
	<span class="error-message">{Array.isArray(errors) ? errors[0] : errors}</span>
{/if}

<style lang="scss">
	.error-message {
		color: $cancel;
		font-size: rem(10);
	}
</style>
