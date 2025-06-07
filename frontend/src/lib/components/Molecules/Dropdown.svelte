<script lang="ts">
	import PolygonBottomIcon from '@tcf/lib/components/Icons/PolygonBottomIcon.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import type { AriaAttributes } from 'svelte/elements';
	import Button from '../Atoms/Button.svelte';
	import { t } from '@tcf/lib/helpers/tHelper';
	import type { ColorsType } from '@tcf/models/colors';
	import { mergeClassNames } from '@tcf/lib/helpers/mergeClassNames';
	import { useClickOutside } from '@tcf/lib/hooks/useClickOutside';

	type Props = {
		color: ColorsType;
		optionCodes: string[];
		onChange: (identifier: string) => void;
		initialSelectedOptionCode: string;
		identifier?: string;
		ariaAttributes?: AriaAttributes;
		extraClass?: string;
		disabled?: boolean;
		displayDefaultValue?: boolean;
	};

	const { color, ariaAttributes, optionCodes, identifier, initialSelectedOptionCode, onChange, extraClass, disabled, displayDefaultValue }: Props =
		$props();

	const bem = createBEM('dropdown');

	let isOpen = $state(false);

	const uuid = $props.id();

	let selectedOptionCode = $state(initialSelectedOptionCode);

	const optionsCodeFiltered = $derived(optionCodes.filter((code: string) => code !== selectedOptionCode));

	let title = $derived(identifier ? `${identifier}.${selectedOptionCode}` : selectedOptionCode);
	if (displayDefaultValue) {
		title = `${identifier}.title`;
	}

	const onOptionClick = (code: string) => {
		selectedOptionCode = code;
		isOpen = false;
		onChange(code);
	};

	const onButtonClick = () => {
		isOpen = !isOpen;
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	};

	const onClickOutside = () => {
		if (isOpen) {
			isOpen = false;
		}
	};
</script>

<div class={bem('wrapper')} onkeydown={handleKeyDown} use:useClickOutside={onClickOutside}>
	<Button
		{color}
		ariaAttributes={{ 'aria-expanded': isOpen, 'aria-controls': `dropdown-menu-${uuid}`, ...ariaAttributes }}
		label={t(title)}
		onClick={onButtonClick}
		{disabled}
		{extraClass}
		iconClass={mergeClassNames('icon-rotate', isOpen ? 'icon-reverse' : '')}
		Icon={PolygonBottomIcon} />
	{#if isOpen}
		<ul id="dropdown-menu-{uuid}" class={bem('menu')}>
			{#each optionsCodeFiltered as code}
				<li>
					<button onclick={() => onOptionClick(code)} class={bem('item')}>
						{t(identifier ? `${identifier}.${code}` : code)}
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
