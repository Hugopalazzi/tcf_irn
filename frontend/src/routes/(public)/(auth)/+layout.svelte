<script lang="ts">
	import PttNavIcon from '@tcf/lib/components/Icons/PttNavIcon.svelte';
	import PresentationCard from '@tcf/lib/components/Molecules/PresentationCard.svelte';
	import AuthenticationCard from '@tcf/lib/components/Organisms/AuthenticationCard.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import '@tcf/styles/styles.scss';
	const bem = createBEM('auth-page');

	const { children } = $props();
</script>

<div class={bem('container')}>
	<div class={bem('icon')}>
		<PttNavIcon globalColor="#1E0C5B" vColor="1E0C5B" />
	</div>
	<div class={bem('card')}>
		<PresentationCard /><AuthenticationCard>{@render children()}</AuthenticationCard>
	</div>
</div>

<style lang="scss">
	.auth-page {
		&__container {
			display: flex;
			flex-direction: column;
			background-image: url('/assets/images/registration/registration_background.svg');
			background-color: #a3e7fc;
			padding: 0 rem(20) rem(20) rem(20);
			height: calc(100vh - rem(20));
			overflow-y: auto;
		}

		&__card {
			display: flex;
			justify-content: center;
			border-radius: rem(40);
			flex-direction: column;
			background: #fff;
			gap: rem(112);
			padding: 0;

			:global(.presentation-card__container) {
				display: none;
			}
		}

		&__icon {
			align-self: center;
			margin: rem(32) 0;
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.auth-page {
			&__card {
				flex-direction: row;
				padding: rem(60) rem(80);

				:global(.presentation-card__container) {
					display: flex;
				}
				:global(.presentation-card__container),
				:global(.authentication-card__container) {
					flex: 1;
				}
			}
		}
	}
</style>
