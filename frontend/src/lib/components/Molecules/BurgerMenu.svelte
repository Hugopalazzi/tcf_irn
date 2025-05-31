<script lang="ts">
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages.js';
	import { primaryHeaderLinks, secondaryHeaderLinks } from '@tcf/lib/configs/header-link.config';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import BurgerLink from '@tcf/lib/components/Atoms/BurgerLink.svelte';
	import { clickOutside } from '@tcf/lib/helpers/clickOutsideHelper';
	import ArrowLeftIcon from '@tcf/lib/components/Icons/ArrowLeftIcon.svelte';

	export type BurgerMenuProps = {
		open: boolean;
	};

	let { open = $bindable(false) }: BurgerMenuProps = $props();

	const bem = createBEM('burger-menu');

	const getIconColor = (isActive: boolean) => {
		return isActive ? '#000' : '#909090';
	};
</script>

<div class={bem('overlay')}>
	<div class={bem('container', { open: open })} use:clickOutside={() => (open = !open)}>
		<div class={bem('heading')}>
			<button onclick={() => (open = false)}><ArrowLeftIcon /></button>
			<nav>
				<ul class={bem('buttons-list')}>
					{#each primaryHeaderLinks as { icon: Icon, labelKey, path }}
						{@const isActive = page.url.pathname.startsWith(path)}
						<li>
							<BurgerLink href={path} bold={isActive} label={m[labelKey]()}>
								<Icon color={getIconColor(isActive)} />
							</BurgerLink>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<div>
			{#each secondaryHeaderLinks as { icon: Icon, key, path }}
				<BurgerLink href={path} bold={true} label={m[key]()}>
					<Icon />
				</BurgerLink>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.burger-menu {
		&__overlay {
			background-color: rgba(0, 0, 0, 0.7);
			height: 100%;
			position: absolute;
			top: 0;
			width: 100%;
		}
		&__container {
			display: none;
			height: calc(100% - 4rem);
			background-color: white;
			position: absolute;
			top: 0;
			width: 75%;
			max-width: rem(350);
			justify-content: space-between;
			padding: rem(32) rem(16);

			&--open {
				display: flex;
				flex-direction: column;
			}
		}

		&__heading {
			display: flex;
			flex-direction: column;
			align-items: start;
			gap: rem(24);
		}

		&__buttons-list {
			list-style: none;
			padding: 0;
			margin: 0;
			li {
				margin: 0;
			}
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.burger-menu {
			&__container {
				display: none;
			}
		}
	}
</style>
