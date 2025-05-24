<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import DescriptionTitle from '../Atoms/DescriptionTitle.svelte';

	interface Props {
		title: string;
		description: string;
	}

	const { title, description }: Props = $props();
	const bem = createBEM('title-with-description');
</script>

<div class={bem('container')}>
	<h1>{title}</h1>
    <DescriptionTitle text={description} />
</div>

<style lang="scss">
	.title-with-description {
		&__container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: rem(4);
		}
	}
</style>
