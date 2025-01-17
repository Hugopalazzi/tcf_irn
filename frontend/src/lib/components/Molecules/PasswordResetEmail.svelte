<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';

	interface Props {
		email: string;
	}

	let { email = '' }: Props = $props();

	const bem = createBEM('password-reset-email');
</script>

<div class={bem('container')}>
	<legend class={bem('legend')}>Nous venons de vous envoyer un email à :</legend>
	<span class={bem('email')}>
		{email}
	</span>
	<div class={bem('text__wrapper')}>
		<p class={bem('text')}>Vous le recevrez dans un délai maximum de 20 s.</p>
		<p class={bem('text')}>Celui-ci contient un lien valide 24 h, permettant de réinitialiser votre mot de passe.</p>
		<p class={bem('text')}>Pensez à vérifier que l'email ne soit pas dans vos indésirables.</p>
	</div>
</div>

<style lang="scss">
	.password-reset-email {
		&__container {
			display: flex;
			flex-direction: column;
			gap: rem(24);
		}

		&__legend {
			font-size: var(--text-xl);
		}

		&__text__wrapper {
			display: flex;
			flex-direction: column;
			gap: rem(8);
		}
	}
</style>
