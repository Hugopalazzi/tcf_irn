<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import DescriptionTitle from '@tcf/lib/components/Atoms/DescriptionTitle.svelte';
	import Breadcrumb from '@tcf/lib/components/Molecules/Breadcrumb.svelte';
	import { mergeClassNames } from '@tcf/lib/helpers/mergeClassNames';

	interface Props {
		title: string;
		links?: Array<{ label: string; href: string }>;
		description?: string;
		additionalClass?: string;
	}

	const { title, links, description, additionalClass }: Props = $props();
	const bem = createBEM('heading-page');
</script>

<div class={mergeClassNames(bem('container'), additionalClass)}>
	{#if links}
		<Breadcrumb {links} />
	{/if}
	<h1>{title}</h1>
	{#if description}
		<DescriptionTitle text={description} />
	{/if}
</div>

<style lang="scss">
	.heading-page {
		&__container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: rem(4);
		}

		&--items-centered {
			align-items: center;
		}
	}
</style>
