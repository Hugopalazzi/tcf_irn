<script lang="ts">
	import { BookOpen, ChatBubbleBottomCenterText, Icon, SpeakerWave } from 'svelte-hero-icons';
	import Bar from './Bar.svelte';
	import { Elements, LinkAuthenticationElement, PaymentElement } from 'svelte-stripe';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { onMount } from 'svelte';
	import { loadStripe, type Stripe } from '@stripe/stripe-js';

	const mockBar: { libelle: string; valeur: string[] }[] = [
		{
			libelle: 'Dates',
			valeur: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
		},
		{
			libelle: 'LC',
			valeur: ['1', '2', '42', '10', '22', '2', '2']
		},
		{
			libelle: 'OC',
			valeur: ['25', '22', '12', '14', '10', '2', '0']
		},
		{
			libelle: 'WE',
			valeur: ['4', '2', '1', '7', '0', '22', '15']
		}
	];
</script>

<h1>Dashboard</h1>
<h2 class="welcome-msg">Hello, Aryan 👋​</h2>
<div class="cards-wrapper">
	<a href="comprehension-orale" class="card">
		<h5>Listening comprehension</h5>
		<Icon src={SpeakerWave} size="20" />
	</a>
	<a href="comprension-ecrite" class="card">
		<h3>Written comprehension</h3>
		<Icon src={BookOpen} size="20" />
	</a>
	<a href="expression-ecrite" class="card">
		<h3>Written expression</h3>
		<Icon src={ChatBubbleBottomCenterText} size="20" />
	</a>
	<a href="paiement">payement page</a>
</div>
<div class="graph-title-wrapper">
	<span class="graph-title">Tests Completed In Past 7 Days</span>
	<div class="centered-graph">
		<Bar dataSet={mockBar} />
	</div>
</div>

<style lang="scss">
	h1 {
		margin-bottom: rem(8);
	}

	.welcome-msg {
		margin-bottom: rem(12);
	}

	.cards-wrapper {
		display: flex;
		gap: rem(20);
		justify-content: center;
		margin-bottom: rem(12);

		.card {
			display: flex;
			align-items: center;
			gap: rem(8);
			padding: rem(12) rem(20);
			border: 1px solid var(--button-primary-color);
			border-radius: rem(12);
		}
	}

	.graph-title-wrapper {
		display: grid;
		gap: rem(16);
		background-color: var(--bg-card-grey);
		border-radius: rem(20);
		padding: rem(16) rem(24);
		justify-items: center;
		font-weight: 600;

		.graph-title {
			padding-bottom: rem(8);
			color: var(--title-card-grey);
		}

		.centered-graph {
			display: flex;
			width: 100%;
			overflow-x: auto;
			overflow-y: hidden;
			white-space: nowrap;
		}

		@include min-width(desktop-large) {
			justify-self: center;
			min-width: rem(1100);
		}
	}
</style>
