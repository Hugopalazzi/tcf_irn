<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import ChevronLeftIcon from '@tcf/lib/components/Icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '@tcf/lib/components/Icons/ChevronRightIcon.svelte';

	type Props = {
		onClick: () => void;
		chevronDirection: 'left' | 'right';
		disabled?: boolean;
	};

	const { onClick, chevronDirection, disabled }: Props = $props();

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'Space') {
			event.preventDefault();
		}
	};
	const bem = createBEM('pagination-chevron-button');
</script>

<button type="button" class={bem('')} role="link" onclick={onClick} onkeydown={onKeyDown} {disabled}>
	{#if chevronDirection === 'left'}
		<ChevronLeftIcon color={disabled ? '#ACACAC' : '#111827'} />
	{:else}
		<ChevronRightIcon color={disabled ? '#ACACAC' : '#111827'} />
	{/if}
</button>

<style lang="scss">
	.pagination-chevron-button {
		display: flex;
		padding: rem(8);
		border-radius: rem(8);
		border: 1px solid #dcdcdc;
		background-color: #f9f9f9;

		&:disabled {
			background-color: #f1f1f1;
			color: gray;
		}
	}
</style>
