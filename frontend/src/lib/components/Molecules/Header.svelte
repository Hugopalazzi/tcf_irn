<script lang="ts">
	import SubscribeIcon from '$lib/components/Icons/SubscribeIcon.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import HeaderNavBar from './HeaderNavBar.svelte';
	import { _ } from 'svelte-i18n';

	const bem = createBEM('header');
</script>

<header class={bem('container')}>
	<HeaderNavBar />

	<div class={bem('subscribe-icon')}>
		<a href="/subscribe" class={bem('link-rounded')} aria-label={$_('header.subscribe')}>
			<SubscribeIcon />
		</a>
	</div>
</header>

<style lang="scss">
	.header {
		&__container {
			display: flex;
			align-items: center;
			overflow: hidden;
			margin-bottom: rem(16);
			background-color: $primary-color;
			padding: rem(16);
			justify-content: space-between;
			border-bottom: rem(1.5) solid var(--secondary-500);
			flex-direction: row;
		}

		&__subscribe-icon {
			display: flex;
			gap: rem(12);
		}

		&__link-rounded {
			background-color: var(--white);
			border-radius: rem(32);
			padding: rem(14);
			display: flex;
		}
	}
</style>
