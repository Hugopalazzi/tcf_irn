<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { mergeClassNames } from '@tcf/lib/helpers/mergeClassNames';
	import type { ColorsType } from '@tcf/models/colors';
	import type { Component } from 'svelte';
	import type { AriaAttributes, AriaRole } from 'svelte/elements';

	type Props = {
		color: ColorsType;
		url: string;
		submitting?: boolean;
		label?: string;
		icon?: Component;
		role?: AriaRole;
		ariaAttributes?: AriaAttributes;
		extraClass?: string;
		onClick?: (event?: MouseEvent | undefined) => void;
	};

	const { color, submitting = $bindable(false), ariaAttributes, label, onClick, icon, extraClass, url }: Props = $props();

	const bem = createBEM('link');
</script>

<a class={mergeClassNames(bem('', { color }), extraClass)} {...ariaAttributes} onclick={onClick} href={url}>
	{#if icon}
		{icon}
	{/if}
	{#if label}
		{label}
	{/if}
</a>

<style lang="scss">
	.link {
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
		width: fit-content;

		&.exams-table__link {
			padding: rem(8) rem(16);
			max-height: rem(32);
			font-size: rem(12);
			font-weight: 700;
			line-height: rem(12);
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

			&_error {
				background-color: #f14336;
				color: #ffffff;
			}

			&_green{
				background: #9CFFB8;
				color: #000000;
			}
		}
	}
</style>
