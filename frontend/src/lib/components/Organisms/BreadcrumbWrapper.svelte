<script lang="ts">
	import type { Snippet } from 'svelte';
	import Breadcrumb from '@tcf/lib/components/Molecules/Breadcrumb.svelte';

	interface Props {
		links: Array<{ label: string; href: string }>;
		children?: Snippet;
	}
	const { links, children }: Props = $props();
</script>

<div class="breadcrumb-wrapper">
	<Breadcrumb {links} />
	{@render children?.()}
</div>

<style lang="scss">
	.breadcrumb-wrapper {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
</style>
