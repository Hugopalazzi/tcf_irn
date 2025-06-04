<script lang="ts">
	import PolygonBottomIcon from '@tcf/lib/components/Icons/PolygonBottomIcon.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import type { AriaAttributes, AriaRole } from 'svelte/elements';
	import Button from './Button.svelte';

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
		role?: AriaRole;
		ariaAttributes?: AriaAttributes;
		extraClass?: string;
		disabled?: boolean;
	};

	const { color, submitting = $bindable(false), ariaAttributes, label, items, role, extraClass, disabled }: Props = $props();

	const bem = createBEM('dropdown-button');

	let open = $state(false);

	const toggle = () => {
		open = !open;
	};

	const handleItemClick = (action: () => void) => {
		action();
		open = false;
	};

	const uuid = $props.id();
</script>

<div class={bem('wrapper')}>
	<Button
		{color}
		ariaAttributes={{ 'aria-expanded': open, 'aria-controls': `dropdown-menu-${uuid}`, ...ariaAttributes }}
		{label}
		onClick={() => toggle()}
		{disabled}
		{role}
		{extraClass}
		Icon={PolygonBottomIcon} />
	{#if open}
		<ul id="dropdown-menu-{uuid}" class={bem('menu')}>
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
