<script lang="ts">
	import { type Component, type Snippet } from 'svelte';
	import Button from '@tcf/lib/components/Atoms/Button.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';

	interface Props {
		opened: boolean;
		dialog: HTMLDialogElement | undefined;
		title: string;
		description?: string;
		children?: Snippet;
		Icon?: Component<any>;
		primaryButtonLabel?: string;
		secondaryButtonLabel?: string;
		onPrimaryBtnClick?: () => void;
		onSecondaryBtnClick?: () => void;
		preventEscapeClose?: boolean;
	}

	let {
		opened = $bindable(),
		dialog = $bindable<HTMLDialogElement | undefined>(),
		title,
		description,
		children,
		Icon,
		secondaryButtonLabel,
		primaryButtonLabel,
		onPrimaryBtnClick,
		onSecondaryBtnClick,
		preventEscapeClose = false
	}: Props = $props();

	$effect(() => {
		if (opened && dialog) {
			dialog.addEventListener('keydown', handleKeyDown);
			dialog.showModal();
		}
	});

	const handleKeyDown = (event: KeyboardEvent) => {
		if (preventEscapeClose && event.key === 'Escape') {
			event.preventDefault();
		}
	};

	// If parent decide to close popin update opened state to close popin
	$effect(() => {
		if (!opened) {
			closePopin();
		}
	});

	const onPopinClose = () => {
		opened = false;
		closePopin();
	};

	const closePopin = () => {
		if (preventEscapeClose) {
			dialog?.removeEventListener('keydown', handleKeyDown);
		}
		dialog?.close();
	};

	const bem = createBEM('popin');
</script>

<dialog aria-modal="true" aria-labelledby={title} bind:this={dialog} class={bem('')} onclose={onPopinClose}>
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
					<div class={bem('secondary-btn-wrapper')}>
						<Button
							onClick={() => {
								onSecondaryBtnClick?.();
							}}
							color="secondary"
							label={secondaryButtonLabel}
							extraClass="button--full-width" />
					</div>
				{/if}
				{#if primaryButtonLabel}
					<div class={bem('primary-btn-wrapper')}>
						<Button
							onClick={() => {
								onPrimaryBtnClick?.();
							}}
							color="primary"
							label={primaryButtonLabel}
							extraClass="button--full-width" />
					</div>
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

			&__secondary-btn-wrapper {
				flex: 1;
			}

			&__primary-btn-wrapper {
				flex: 2;
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
