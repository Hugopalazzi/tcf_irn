<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import HeaderNavBar from './HeaderNavBar.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import BurgerMenuIcon from '@tcf/lib/components/Icons/BurgerMenuIcon.svelte';
	import BurgerMenu from '@tcf/lib/components/Molecules/BurgerMenu.svelte';
	import { secondaryHeaderLinks } from '@tcf/lib/configs/header-link.config';

	const bem = createBEM('header');
	
	export type BurgerMenuProps = {
		burgerOpen: boolean;
	};

	let { burgerOpen = $bindable(false) }: BurgerMenuProps = $props();
</script>

<header>
	<div class={bem('container')}>
		<button class={bem('burger-icon')} aria-label={m['header.burgerAriaLabel']()} onclick={() => (burgerOpen = !burgerOpen)}>
			<BurgerMenuIcon />
		</button>
		<HeaderNavBar />

		<div class={bem('subscribe-icon')}>
			{#each secondaryHeaderLinks as { icon: Icon, key, path }}
				<a href={path} class={bem('link-rounded')} aria-label={m[key]()}>
					<Icon />
				</a>
			{/each}
		</div>
	</div>
	{#if burgerOpen}
		<BurgerMenu bind:open={burgerOpen} />
	{/if}
</header>

<style lang="scss">
	.header {
		&__container {
			display: grid;
			grid-template-columns: 1fr min-content 1fr;
			background-color: $primary-color;
			border-bottom: rem(1.5) solid var(--secondary-500);
			padding: rem(16);
			justify-content: space-between;
		}

		&__subscribe-icon {
			display: none;
		}

		&__link-rounded {
			background-color: var(--white);
			border-radius: rem(32);
			padding: rem(14);
			display: flex;
		}

		&__burger-icon {
			height: rem(40);
			width: rem(40);
			border-radius: rem(40);
			background-color: white;
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.header {
			&__container {
				display: flex;
				align-items: center;
				flex-direction: row;
			}

			&__burger-icon {
				display: none;
			}

			&__subscribe-icon {
				display: flex;
				gap: rem(12);
			}
		}
	}
</style>
