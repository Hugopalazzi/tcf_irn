<script lang="ts">
	import PresentationCard from '@tcf/lib/components/Molecules/PresentationCard.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import '@tcf/styles/styles.scss';
	const bem = createBEM('auth-page');

	let { children } = $props();
</script>

<div class={bem('container')}>
	<div class={bem('card')}><PresentationCard /> {@render children()}</div>
</div>

<style lang="scss">
	.auth-page {
		&__container {
			display: flex;
			flex-direction: column;
			height: 100vh;
			background-image: url('/assets/images/registration/registration_background.svg');
			background-color: #a3e7fc;
			padding: rem(20);
		}
		&__card {
			display: flex;
			justify-content: center;
			border-radius: 40px;
			background: #fff;
			width: 100%;
			height: 100%;
            padding: rem(60) rem(80);
		}
	}
</style>
