<script lang="ts">
	import type { LinkCardElementProps } from '@tcf/lib/components/Molecules/LinkCardElement.svelte';
	import LinkCardElement from '@tcf/lib/components/Molecules/LinkCardElement.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';

	type Props = {
		links: LinkCardElementProps[];
	};

	const { links }: Props = $props();

	const bem = createBEM('link-cards');
</script>

<div class={'link-cards-container'}>
	{#each links as link, i}
		<LinkCardElement {...link} />
	{/each}
</div>

<style lang="scss">
	.link-cards-container {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
		align-items: stretch;
	}

	@media (min-width: $breakpoint-desktop) {
		.link-cards-container {
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
		}
	}
</style>
