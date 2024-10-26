<script lang="ts">
	import { createSelect, melt } from '@melt-ui/svelte';
	import { Check, ChevronDown, ChevronUp, Icon } from 'svelte-hero-icons';
	import { fade } from 'svelte/transition';

	const options = {
		sweet: ['Caramel', 'Chocolate', 'Strawberry', 'Cookies & Cream'],
		savory: ['Basil', 'Bacon', 'Rosemary']
	};

	const {
		elements: { trigger, menu, option, group, groupLabel, label },
		states: { selectedLabel, open },
		helpers: { isSelected }
	} = createSelect<string>({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		}
	});
</script>

<div class="page-container">
	<div class="left-size">
		<img class="logo" src="/assets/images/logo_my_story.png" alt="My story" />
		<h2>Aprenez le francais en vous amusant avec Mystory.</h2>
	</div>
	<div class="right-size">
		<div class="flex flex-col gap-1">
			<button
				class="flex h-10 min-w-[220px] items-center justify-between rounded-lg bg-white px-3 py-2
            text-magnum-700 shadow transition-opacity hover:opacity-90"
				use:melt={$trigger}
				aria-label="Food"
			>
				{$selectedLabel || 'Select a flavor'}
				<Icon src={ChevronDown} size="18" />
			</button>
			{#if $open}
				<div
					class=" z-10 flex max-h-[300px] flex-col
              overflow-y-auto rounded-lg bg-white p-1
              shadow focus:!ring-0"
					use:melt={$menu}
					transition:fade={{ duration: 150 }}
				>
					{#each Object.entries(options) as [key, arr]}
						<div use:melt={$group(key)}>
							<div
								class="py-1 pl-4 pr-4 font-semibold capitalize text-neutral-800"
								use:melt={$groupLabel(key)}
							>
								{key}
							</div>
							{#each arr as item}
								<div
									class="relative cursor-pointer rounded-lg py-1 pl-8 pr-4 text-neutral-800
                        hover:bg-magnum-100 focus:z-10
                        focus:text-magnum-700
                        data-[highlighted]:bg-magnum-200 data-[highlighted]:text-magnum-900
                        data-[disabled]:opacity-50"
									use:melt={$option({ value: item, label: item })}
								>
									<div class="check {$isSelected(item) ? 'block' : 'hidden'}">
										<Icon src={Check} size="18" />
									</div>

									{item}
								</div>
							{/each}
						</div>
					{/each}
				</div>
			{/if}
		</div>
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
			border: rem(1) solid white;
			border-radius: rem(16);
		}
	}
</style>
