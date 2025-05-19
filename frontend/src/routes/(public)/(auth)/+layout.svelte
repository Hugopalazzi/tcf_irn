<script lang="ts">
	import PttNavIcon from '@tcf/lib/components/Icons/PttNavIcon.svelte';
	import PresentationCard from '@tcf/lib/components/Molecules/PresentationCard.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import '@tcf/styles/styles.scss';
	const bem = createBEM('auth-page');

	const { children } = $props();
</script>

<div class={bem('container')}>
	<div class={bem('icon')}>
		<PttNavIcon globalColor="#1E0C5B" vColor="1E0C5B" />
	</div>
	<div class={bem('card')}><PresentationCard /> {@render children()}</div>
</div>

<style lang="scss">
	.auth-page {
		&__container {
			display: flex;
			flex-direction: column;
			background-image: url('/assets/images/registration/registration_background.svg');
			background-color: #a3e7fc;
			padding: 0 rem(20) rem(20) rem(20);
		}
		&__card {
			display: flex;
			justify-content: center;
			border-radius: rem(40);
			background: #fff;
			height: 100%;
			padding: rem(60) rem(80);
		}
		&__icon {
			align-self: center;
			margin: rem(32) 0;
		}
	}
</style>
