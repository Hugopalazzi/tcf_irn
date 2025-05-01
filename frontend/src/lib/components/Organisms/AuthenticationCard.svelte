<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { Snippet } from 'svelte';

	const bem = createBEM('authentification-card');

	interface Props {
		children?: Snippet;			
	}

	let { children }: Props = $props();
</script>

<div class={bem('container')}>
	<div class={bem('text')}>
		<h1 class={bem('title')}>{$_('authentificationCard.title')}</h1>
		<p class={bem('description')}>{$_('authentificationCard.description')}</p>
	</div>
	<button class={bem('google-button')}>
		<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10.0614 18.2253L9.31883 20.9975L6.6047 21.0549C5.79358 19.5504 5.3335 17.8292 5.3335 16C5.3335 14.2312 5.76366 12.5632 6.52616 11.0945H6.52675L8.94308 11.5375L10.0016 13.9393C9.78004 14.5852 9.65929 15.2785 9.65929 16C9.65937 16.783 9.8012 17.5332 10.0614 18.2253Z"
				fill="#FBBB00" />
			<path
				d="M26.4807 14.0073C26.6032 14.6526 26.667 15.3189 26.667 16C26.667 16.7637 26.5867 17.5086 26.4338 18.2271C25.9145 20.6722 24.5577 22.8073 22.6782 24.3182L22.6776 24.3177L19.6341 24.1624L19.2034 21.4734C20.4505 20.742 21.4252 19.5974 21.9386 18.2271H16.2349V14.0073H22.0218H26.4807Z"
				fill="#518EF8" />
			<path
				d="M22.6772 24.3176L22.6777 24.3182C20.8498 25.7875 18.5277 26.6666 16 26.6666C11.9378 26.6666 8.40612 24.3962 6.60449 21.0549L10.0612 18.2253C10.962 20.6294 13.2811 22.3408 16 22.3408C17.1686 22.3408 18.2634 22.0249 19.2029 21.4734L22.6772 24.3176Z"
				fill="#28B446" />
			<path
				d="M22.8086 7.78892L19.3531 10.6179C18.3808 10.0102 17.2315 9.65908 16.0001 9.65908C13.2197 9.65908 10.8572 11.449 10.0016 13.9393L6.52671 11.0944H6.52612C8.30137 7.67171 11.8776 5.33325 16.0001 5.33325C18.5882 5.33325 20.9613 6.25517 22.8086 7.78892Z"
				fill="#F14336" />
		</svg>
	</button>
	<div class={bem('condition')}>
		<div class={bem('line')}></div>
		<span class={bem('or')}>or</span>
		<div class={bem('line')}></div>
	</div>
	<div class={bem('form-container')}>
		<span>Se connecter via email</span>
	</div>
	{@render children?.()}
</div>

<style lang="scss">
	.authentification-card {
		&__container {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			padding: 42px;
			gap: rem(32);
			border-radius: 20px;
			background: #FFF;
			box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.06);
		}

		&__text {
			display: flex;
			flex-direction: column;
			gap: rem(4);
		}

		&__title {
			font-size: rem(24);
			color: #000000;
			font-weight: 700;
			line-height: rem(32);
		}

		&__description {
			font-size: rem(16);
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
		}

		&__form-container {
			display: flex;
			flex-direction: column;
			gap: rem(24);
		}
	}
</style>
