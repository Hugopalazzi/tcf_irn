<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import type { Component } from 'svelte';
	import type { AriaAttributes, AriaRole } from 'svelte/elements';

	const ColorsEnum = {
		PRIMARY: 'primary',
		SECONDARY: 'secondary',
		ERROR: 'error'
	} as const;

	type ColorType = (typeof ColorsEnum)[keyof typeof ColorsEnum];

	type Props = {
		onClick: () => void;
		color: ColorType;
		label?: string;
		icon?: Component;
		role?: AriaRole;
		ariaAttributes?: AriaAttributes;
		disabled?: boolean;
	};

	const { color, ariaAttributes, label, onClick, icon, role, disabled }: Props = $props();

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'Space' && role === 'link') {
			event.preventDefault();
		}
	};
	const bem = createBEM('button');
</script>

<button class={bem('', { color })} role={role ?? 'button'} {...ariaAttributes} onclick={onClick} onkeydown={onKeyDown} {disabled}>
	{#if icon}
		{icon}
	{/if}
	{#if label}
		<span>{label}</span>
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

        &--color{
            &_primary{
                background-color: #1E0C5B;
                color: #FFFFFF;
            }

            &_secondary{
                background-color: #E9E7EF;
                color: #1E0C5B;
            }

            &_error{
                background-color: #F14336;
                color: #FFFFFF;
            }
        }
	}
</style>
