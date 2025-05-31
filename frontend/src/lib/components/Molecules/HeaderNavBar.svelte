<script lang="ts">
	import { page } from '$app/state';
	import HeaderLink from '@tcf/lib/components/Atoms/HeaderLink.svelte';
	import PttNavIcon from '@tcf/lib/components/Icons/PttNavIcon.svelte';
	import { m } from '@tcf/lib/paraglide/messages.js';
	import { primaryHeaderLinks } from '@tcf/lib/configs/header-link.config';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';

	const bem = createBEM('header-nav-bar');

	const getIconColor = (isActive: boolean) => {
		return isActive ? '#000' : '#fff';
	};
</script>

<nav class={bem('container')}>
	<PttNavIcon />
	<div class={bem('vertical-bar')}></div>

	<ul class={bem('buttons-list')}>
		{#each primaryHeaderLinks as { icon: Icon, labelKey, path }}
			{@const isActive = page.url.pathname.startsWith(path)}
			<li>
				<HeaderLink href={path} {isActive} label={m[labelKey]()}>
					<Icon color={getIconColor(isActive)} />
				</HeaderLink>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	.header-nav-bar {
		&__container {
			display: flex;
			gap: rem(32);
			flex-direction: row;
		}

		&__vertical-bar {
			display: none;
		}

		&__buttons-list {
			display: none;
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.header-nav-bar {
			&__vertical-bar {
				display: block;
				border-right: 1px solid white;
			}

			&__buttons-list {
				display: flex;
				flex-direction: row;
				list-style: none;
				margin: 0;
				padding: 0;
				gap: rem(12);
			}
		}
	}
</style>
