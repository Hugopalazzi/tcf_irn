<script lang="ts">
	import BackButton from '@tcf/lib/widgets/BackButton.svelte';
	import { Envelope, Icon } from 'svelte-hero-icons';
</script>

<div class="page-container">
	<div class="left-size">
		<img class="logo" src="/assets/images/logo_my_story.png" alt="My story" />
		<h2>Apprenez le francais en vous amusant avec Mystory.</h2>
	</div>
	<div class="right-size">
		<BackButton />
		<h1 class="title">Login</h1>

		<div class="input-wrapper">
			<label for="email"> Your email </label>
			<input id="email" name="email" placeholder="john.doe@mail.com" />
		</div>
		<div class="input-wrapper">
			<label for="password"> Your password </label>
			<input type="password" id="password" name="password" placeholder="password" />
		</div>

		<div class="link-button-wrapper">
			<a href="forgot-password"> Forgot your password ?</a>
			<button class="btn btn-primary btn-icon">
				<Icon src={Envelope} size="18" />Log in
			</button>
		</div>
	</div>
</div>

<style lang="scss">
	.link-button-wrapper {
		display: flex;
		flex-direction: column;
		place-items: center;
		gap: rem(4);
	}
</style>
