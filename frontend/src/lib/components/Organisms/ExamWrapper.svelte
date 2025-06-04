<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	const { children }: Props = $props();
</script>

<div class="exam__wrapper">
	{@render children?.()}
</div>

<style lang="scss">
	.exam__wrapper {
		display: flex;
		flex-direction: row;
		align-self: center;
	}
</style>
