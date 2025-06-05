<script lang="ts">
	import PolygonBottomIcon from '@tcf/lib/components/Icons/PolygonBottomIcon.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import type { AriaAttributes } from 'svelte/elements';
	import Button from './Button.svelte';
	import { t } from '@tcf/lib/helpers/tHelper';
	import type { ColorsType } from '@tcf/models/colors';
	import { mergeClassNames } from '@tcf/lib/helpers/mergeClassNames';

	type Props = {
		color: ColorsType;
		items: string[];
		identifier: string;
		onChange: (identifier: string) => void;
		ariaAttributes?: AriaAttributes;
		extraClass?: string;
		disabled?: boolean;
	};

	const { color, ariaAttributes, items, identifier = $bindable(), onChange, extraClass, disabled }: Props = $props();

	const bem = createBEM('dropdown');

	let open = $state(false);

	const toggle = () => {
		open = !open;
	};

	const uuid = $props.id();
</script>

<div class={bem('wrapper')}>
	<Button
		{color}
		ariaAttributes={{ 'aria-expanded': open, 'aria-controls': `dropdown-menu-${uuid}`, ...ariaAttributes }}
		label={t(identifier)}
		onClick={() => toggle()}
		{disabled}
		{extraClass}
		iconClass={mergeClassNames('icon-rotate', open ? 'icon-reverse' : '')}
		Icon={PolygonBottomIcon} />
	{#if open}
		<ul id="dropdown-menu-{uuid}" class={bem('menu')}>
			{#each items.filter((item) => item !== identifier) as item}
				<li>
					<button
						onclick={() => {
							onChange(item);
							open = false;
						}}
						class={bem('item')}>
						{t(item)}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	.dropdown {
		&__wrapper {
			position: relative;
			display: flex;
			flex-direction: column;
			gap: 4px;
			max-height: 44px;
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
			position: relative;
			z-index: 2;
			margin: 0;
			text-align: center;
			background-color: white;
			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
			border-radius: rem(6);
			padding: rem(4) 0;
			list-style: none;
		}

		&__item {
			white-space: nowrap;
			font-weight: 600;
			padding: rem(12) rem(20);
		}
	}

	@media (min-width: $breakpoint-tablet) {
		.dropdown {
			&__menu {
				text-align: left;
			}
		}
	}
</style>
