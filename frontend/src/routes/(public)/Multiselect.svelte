<script lang="ts">
	import { createSelect, melt } from '@melt-ui/svelte';
	import { ChevronDown, ChevronUp, Icon } from 'svelte-hero-icons';

	interface MultiSelectOption {
		value: string;
		label: string;
	}

	const meltOptions: MultiSelectOption[] = [
		{ label: 'English', value: 'eng' },
		{ label: 'Sri lankais', value: 'sri' },
		{ label: 'Français', value: 'fr' }
	];

	const {
		elements: { trigger, menu, option },
		states: { open, selected }
	} = createSelect<string>({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		},
		defaultSelected: { label: 'English', value: 'eng' }
	});
</script>

<button class="select-button" use:melt={$trigger} aria-label="language">
	<span class="selected-language">
		{$selected?.label}
	</span>
	{#if $open}
		<Icon src={ChevronUp} size="18" />
	{:else}
		<Icon src={ChevronDown} size="18" />
	{/if}
</button>
{#if $open}
	<div class="options-list-wrapper" use:melt={$menu}>
		{#each meltOptions as item}
			<div class="multi-select-option" use:melt={$option({ value: item.value, label: item.label })}>
				<button class="select-option-text">
					{item.label}
				</button>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.select-button {
		display: flex;
		min-width: 13.75rem;
		padding-right: 0.75rem;
		justify-content: space-between;
		align-items: center;
		border-radius: 0.5rem;
		height: 2.5rem;
		background-color: var(--white);
		transition-duration: 300ms;
		box-shadow:
			0 1px 3px 0 rgba(0, 0, 0, 0.1),
			0 1px 2px 0 rgba(0, 0, 0, 0.06);
		margin-bottom: rem(4);

		.selected-language {
			color: black;
			max-width: rem(400);
			overflow: hidden;
			text-align: left;
			font-weight: 600;
			padding-left: rem(4);
		}
	}

	.options-list-wrapper {
		background-color: white;
		z-index: 1;
		box-shadow:
			0 rem(1) rem(3) 0 rgb(0 0 0 / 0.1),
			0 rem(1) rem(2) rem(-1) rgb(0 0 0 / 0.1);
		border-radius: rem(8);

		.multi-select-option {
			display: flex;
			padding: rem(10);
			background-color: var(--white);
			font-size: rem(16);

			&:first-child {
				border-radius: rem(8) rem(8) 0 0;
			}

			&:last-child {
				border-radius: 0 0 rem(8) rem(8);
			}

			&[data-highlighted] {
				background-color: var(--secondary-200);
			}

			.select-option-text {
				display: inline-flex;
				align-items: center;
				gap: rem(8);
				font-size: rem(14);
				padding: 0;
				border: 0;
				background-color: inherit;
				font-weight: 600;
			}
		}
	}
</style>
