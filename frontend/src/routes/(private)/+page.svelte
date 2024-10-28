<script lang="ts">
	import { createSelect, melt } from '@melt-ui/svelte';
	import { Check, ChevronDown, ChevronUp, Icon } from 'svelte-hero-icons';
	import { fade } from 'svelte/transition';

	interface MultiSelectOption {
		value: string;
		label: string;
	}

	const meltOptions: MultiSelectOption[] = [
		{ label: 'English', value: 'eng' },
		{ label: 'Français', value: 'fr' }
	];

	const {
		elements: { trigger, menu, option },
		states: { selectedLabel, open, selected }
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

<div class="page-container">
	<div class="left-size">
		<img class="logo" src="/assets/images/logo_my_story.png" alt="My story" />
		<h2>Apprenez le francais en vous amusant avec Mystory.</h2>
	</div>
	<div class="right-size">
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
					<div
						class="multi-select-option checkbox"
						use:melt={$option({ value: item.value, label: item.label })}
					>
						<button class="select-option-text">
							<p class="select-text">
								{item.label}
							</p>
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.page-container {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: rem(100);
		.left-size {
			max-width: rem(320);
			right: rem(80);
			img {
				width: 100%;
			}
		}

		.right-size {
			border: rem(1) solid var(--dark-purple);
			border-radius: rem(16);
			padding: rem(20);
			background-image: linear-gradient(to bottom right, var(--dark-purple), var(--light-purple));

			.select-button {
				display: flex;
				min-width: 13.75rem;
				padding-right: 0.75rem;
				justify-content: space-between;
				align-items: center;
				border-radius: 0.5rem;
				height: 2.5rem;
				background-color: #ffffff;
				transition-property: opacity;
				transition-duration: 300ms;
				box-shadow:
					0 1px 3px 0 rgba(0, 0, 0, 0.1),
					0 1px 2px 0 rgba(0, 0, 0, 0.06);

				.selected-language {
					max-width: rem(400);
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					line-clamp: 1;
					overflow: hidden;
					text-align: left;
				}
			}
		}
	}

	.options-list-wrapper {
		background-color: white;
		z-index: 1;
		box-shadow:
			0 rem(1) rem(3) 0 rgb(0 0 0 / 0.1),
			0 rem(1) rem(2) rem(-1) rgb(0 0 0 / 0.1);
		border-radius: rem(8);
	}
</style>
