<script lang="ts">
	import { type Component, type Snippet } from 'svelte';
	import Button from '../Atoms/Button.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';

	interface Props {
		opened: boolean;
		dialog: HTMLDialogElement | undefined;
		title: string;
		description?: string;
		children?: Snippet;
		Icon?: Component<any>;
		buttonList?: Component<any>[];
	}

	let { opened = $bindable(), dialog = $bindable<HTMLDialogElement | undefined>(), title, description, children, Icon, buttonList }: Props = $props();

	$effect(() => {
		if (opened && dialog) {
			dialog.showModal();
		}
	});
	function onPopClose() {
		opened = false;
	}

	const bem = createBEM('popin');
</script>

<dialog aria-modal="true" aria-labelledby={title} bind:this={dialog} class={bem('')} onclose={onPopClose}>
	<div class={bem('container')}>
		{#if Icon}
			<Icon />
		{/if}

		<div class={bem('title-description')}>
			<h2 class={bem('title')}>{title}</h2>
			<span class={bem('description')}>
				{description}
			</span>
		</div>
		{@render children?.()}

		{#if buttonList}
			{#each buttonList as Button}
				<Button />
			{/each}
		{/if}
	</div>
</dialog>

<style lang="scss">
	.popin {
		border: none;
		border-radius: rem(32);
		animation-name: scale;
		animation-duration: 200ms;
		padding: rem(24) rem(16);

		&__container {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: rem(20);
			background: #fff;
		}

		&__title-description {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: rem(4);
		}

		&__title {
			font-size: 16px;
			line-height: 20px;
			font-weight: 700;
		}

		&__description {
			color: rgba(0, 0, 0, 0.5);
			text-align: center;
			font-style: normal;
			font-weight: 500;
			font-size: rem(14);
			line-height: rem(20);
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.popin {
			padding: rem(32);

			&__container {
				gap: rem(32);
			}

			&__title-description {
				gap: rem(12);
			}

			&__title {
				font-size: rem(42);
				line-height: rem(52);
			}
			&__description {
				font-size: rem(20);
				line-height: rem(24);
			}
		}
	}

	@keyframes scale {
		from {
			transform: scale(0.5);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
