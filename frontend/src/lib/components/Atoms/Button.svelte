<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { mergeClassNames } from '@tcf/lib/helpers/mergeClassNames';
	import type { Component } from 'svelte';
	import type { AriaAttributes, AriaRole } from 'svelte/elements';
	import LoadingIcon from '@tcf/lib/components/Icons/LoadingIcon.svelte';
	import type { ColorsType } from '@tcf/models/colors';

	type Props = {
		onClick: () => void;
		color: ColorsType;
		submitting?: boolean;
		label?: string;
		Icon?: Component<any>;
		iconClass?: string;
		role?: AriaRole;
		ariaAttributes?: AriaAttributes;
		extraClass?: string;
		disabled?: boolean;
	};

	const { color, submitting = $bindable(false), ariaAttributes, label, onClick, Icon, iconClass, role, extraClass, disabled }: Props = $props();

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'Space' && role === 'link') {
			event.preventDefault();
		}
	};
	const bem = createBEM('button');
</script>

<button
	class={mergeClassNames(bem('', { color }), extraClass)}
	role={role ?? 'button'}
	{...ariaAttributes}
	onclick={onClick}
	onkeydown={onKeyDown}
	{disabled}>
	{#if label}
		<span class={bem('label')}>
			{#if submitting}<LoadingIcon spinning={true} />{/if}
			{label}
		</span>
	{/if}
	{#if Icon}
		<div class={mergeClassNames(bem('icon-wrapper'), iconClass)}>
			<Icon />
		</div>
	{/if}
</button>

<style lang="scss">
	.button {
		padding: rem(12) rem(20);
		border-radius: rem(174);
		justify-content: center;
		align-items: center;
		gap: rem(8);
		display: flex;
		background-color: none;
		font-size: rem(14);
		font-weight: 700;
		line-height: rem(20);

		&:disabled {
			cursor: not-allowed;
		}
		
		&--color {
			&_primary {
				background-color: #1e0c5b;
				color: #ffffff;
			}

			&_secondary {
				background-color: #e9e7ef;
				color: #1e0c5b;
			}

			&_tertiary {
				background: #a3e7fc;
				color: #000;
			}

			&_error {
				background-color: #f14336;
				color: #ffffff;
			}
		}
		
		&--full-width {
			width: 100%;
		}

		&:disabled {
			background-color: #f1f1f1;
			color: gray; //TODO: waiting for color code from designer
		}

		&__label {
			display: flex;
			place-items: center;
			gap: rem(4);
		}

		&__icon-wrapper {
			display: flex;
		}
	}
</style>
