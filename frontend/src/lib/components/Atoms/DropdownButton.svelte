<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { mergeClassNames } from '@tcf/lib/helpers/mergeClassNames';
	import type { Component } from 'svelte';
	import type { AriaAttributes, AriaRole } from 'svelte/elements';
	import LoadingIcon from '@tcf/lib/components/Icons/LoadingIcon.svelte';
	import PolygonBottomIcon from '@tcf/lib/components/Icons/PolygonBottomIcon.svelte';

	const ColorsEnum = {
		PRIMARY: 'primary',
		SECONDARY: 'secondary',
		TERTIARY: 'tertiary',
		ERROR: 'error'
	} as const;

	type ColorType = (typeof ColorsEnum)[keyof typeof ColorsEnum];

	type Props = {
		color: ColorType;
		items: { label: string; onClick: () => void }[];
		submitting?: boolean;
		label?: string;
		icon?: Component;
		role?: AriaRole;
		ariaAttributes?: AriaAttributes;
		extraClass?: string;
		disabled?: boolean;
	};

	const { color, submitting = $bindable(false), ariaAttributes, label, items, icon, role, extraClass, disabled }: Props = $props();

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'Space' && role === 'link') {
			event.preventDefault();
		}
	};
	const bem = createBEM('dropdown-button');

	let open = $state(false);

	const toggle = () => {
		open = !open;
	};

	const handleItemClick = (action: () => void) => {
		action();
		open = false;
	};
</script>

<div class={bem('wrapper')}>
	<button
		class={mergeClassNames(bem('', { color }), extraClass)}
		role={role ?? 'button'}
		{...ariaAttributes}
		onclick={toggle}
		onkeydown={onKeyDown}
		{disabled}>
		{#if icon}
			{icon}
		{/if}
		{#if label}
			<span class={bem('label')}>
				{#if submitting}<LoadingIcon spinning={true} />{/if}
				{label}
			</span>
			<PolygonBottomIcon />
		{/if}
	</button>
	{#if open}
		<ul class={bem('menu')}>
			{#each items as item}
				<li>
					<button onclick={() => handleItemClick(item.onClick)} class={bem('item')}>{item.label}</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	.dropdown-button {
		padding: rem(12) rem(20);
		border-radius: rem(174);
		justify-content: center;
		align-items: center;
		gap: rem(8);
		display: flex;
		background-color: none;
		font-size: rem(12);
		font-weight: 700;
		line-height: rem(20);

		&__wrapper {
			position: relative;
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

		&:disabled {
			background-color: #f1f1f1;
			color: gray; //TODO: waiting for color code from designer
		}

		&__label {
			display: flex;
			place-items: center;
			gap: rem(4);
		}
		&__menu {
			position: absolute;
			right: 0;
			top: 100%;
			margin-top: rem(4);
			background-color: white;
			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
			border-radius: rem(6);
			padding: rem(4) 0;
			list-style: none;
		}

		&__item {
			white-space: nowrap;
			font-weight: 600;
			padding: 0.5rem;
		}
	}
</style>
