<script lang="ts">
	import { Envelope, Icon } from 'svelte-hero-icons';
	import Multiselect from './Multiselect.svelte';
	import GoogleIcon from './GoogleIcon.svelte';
</script>

<div class="page-container">
	<div class="left-size">
		<img class="logo" src="/assets/images/logo_my_story.png" alt="My story" />
		<h2>Apprenez le francais en vous amusant avec Mystory.</h2>
	</div>
	<div class="right-size">
		<Multiselect />

		<button class="btn btn-primary btn-icon">
			<Icon src={Envelope} size="18" />Create an account
		</button>

		<div class="two-button">
			<button class="btn btn-secondary btn-icon"> <GoogleIcon /></button>
			<button class="btn btn-secondary"> <span>Login</span></button>
		</div>
	</div>
</div>

<style lang="scss">
	.page-container {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: rem(100);
		.left-size {
			max-width: rem(320);
			right: rem(80);
			img {
				width: 100%;
			}
		}

		.right-size {
			border: rem(1) solid var(--dark-purple);
			border-radius: rem(16);
			padding: rem(20);
			display: flex;
			flex-direction: column;
			gap: rem(12);
			background-image: linear-gradient(to bottom right, var(--dark-purple), var(--light-purple));
			.two-button {
				display: flex;
				gap: rem(4);
			}
		}
	}
</style>
