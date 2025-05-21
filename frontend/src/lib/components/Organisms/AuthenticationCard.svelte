<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';
	import type { Snippet } from 'svelte';
	import GoogleIcon from '@tcf/lib/components/Icons/GoogleIcon.svelte';

	const bem = createBEM('authentication-card');

	interface Props {
		children?: Snippet;
	}

	const { children }: Props = $props();
</script>

<div class={bem('container')}>
	<div class={bem('text')}>
		<h1 class={bem('title')}>{$_('authentificationCard.title')}</h1>
		<p class={bem('description')}>{$_('authentificationCard.description')}</p>
	</div>
	<a
		href="/auth/login/google"
		class={bem('google-button')}
		aria-label={$_('authentificationCard.ariaGoogleIcon')}
		title={$_('authentificationCard.ariaGoogleIcon')}>
		<GoogleIcon />
	</a>
	<div class={bem('condition')}>
		<div class={bem('line')}></div>
		<span class={bem('or')}>{$_('or')}</span>
		<div class={bem('line')}></div>
	</div>
	{@render children?.()}
</div>

<style lang="scss">
	.authentication-card {
		&__container {
			display: flex;
			flex-direction: column;
			padding: rem(16);
			gap: rem(20);
			border-radius: rem(40);
			background: #fff;
			box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.06);
		}

		&__text {
			display: flex;
			flex-direction: column;
			gap: rem(4);
			text-align: center;
		}

		&__title {
			font-size: rem(24);
			color: #000000;
			font-weight: 700;
			line-height: rem(32);
		}

		&__description {
			font-size: rem(12);
			color: rgba(0, 0, 0, 0.5);
			font-weight: 400;
			line-height: rem(24);
		}

		&__google-button {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 48px;
			background-color: transparent;
			border-radius: rem(42);
			border: 1px solid #dcdcdc;
			cursor: pointer;
		}

		&__condition {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: rem(10);
			height: rem(44);
			width: 100%;
		}

		&__line {
			background-color: #35495b;
			height: rem(1);
			width: calc(100% / 3);
		}

		&__or {
			text-transform: uppercase;
			color: #35495b;
			padding: rem(10);
			border-radius: rem(12);
			border: 1px solid #35495b;
			width: calc(100% / 3);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: rem(16);
			font-weight: 500;
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.authentication-card {
			&__container {
				padding: rem(42);
				border-radius: rem(20);
				gap: rem(32);
			}

			&__description {
				font-size: rem(16);
				line-height: rem(20);
			}
		}
	}
</style>
