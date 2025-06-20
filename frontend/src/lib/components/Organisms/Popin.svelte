<script lang="ts">
	import { type Component, type Snippet } from 'svelte';
	import Button from '@tcf/lib/components/Atoms/Button.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { focusTrap } from '@tcf/lib/helpers/focusTrapHelper';

	interface Props {
		isOpen: boolean;
		title: string;
		description?: string;
		children?: Snippet;
		Icon?: Component<any>;
		primaryButtonLabel?: string;
		secondaryButtonLabel?: string;
		onPrimaryBtnClick?: () => void;
		onSecondaryBtnClick?: () => void;
		isClosable?: boolean;
	}

	let {
		isOpen = $bindable(),
		title,
		description,
		children,
		Icon,
		secondaryButtonLabel,
		primaryButtonLabel,
		onPrimaryBtnClick,
		onSecondaryBtnClick,
		isClosable = true
	}: Props = $props();

	let dialog: HTMLDialogElement | undefined;

	$effect(() => {
		if (isOpen && dialog) {
			dialog.addEventListener('keydown', handleKeyDown);
			dialog.showModal();
		}
	});

	const handleKeyDown = (event: KeyboardEvent) => {
		if (dialog) {
			focusTrap(event, dialog);
			if (!isClosable && event.key === 'Escape') {
				event.preventDefault();
			}
		}
	};

	// If parent decide to close popin update opened state to close popin
	$effect(() => {
		if (!isOpen) {
			closePopin();
		}
	});

	const onPopinClose = () => {
		isOpen = false;
		closePopin();
	};

	const closePopin = () => {
		if (isClosable) {
			dialog?.removeEventListener('keydown', handleKeyDown);
		}
		dialog?.close();
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (event.target === dialog && isClosable) {
			isOpen = false;
			closePopin();
		}
	};

	const bem = createBEM('popin');
</script>

<dialog aria-modal="true" aria-labelledby={title} bind:this={dialog} class={bem('')} onclose={onPopinClose} onclick={handleOutsideClick}>
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

		{#if primaryButtonLabel || secondaryButtonLabel}
			<div class={bem('btn-wrapper')}>
				{#if secondaryButtonLabel}
					<Button
						onClick={() => {
							onSecondaryBtnClick?.();
						}}
						color="secondary"
						label={secondaryButtonLabel}
						extraClass="button--full-width" />
				{/if}
				{#if primaryButtonLabel}
					<Button
						onClick={() => {
							onPrimaryBtnClick?.();
						}}
						color="primary"
						label={primaryButtonLabel}
						extraClass="button--full-width" />
				{/if}
			</div>
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

		&__btn-wrapper {
			display: flex;
			flex-direction: column;
			width: 100%;
			gap: rem(12);
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

			&__btn-wrapper {
				flex-direction: row;
				gap: rem(20);
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
