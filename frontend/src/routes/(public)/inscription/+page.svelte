<script lang="ts">
	import { Envelope, Icon } from 'svelte-hero-icons';
</script>

<div class="page-container">
	<div class="left-size">
		<img class="logo" src="/assets/images/logo_my_story.png" alt="My story" />
		<h2>Apprenez le francais en vous amusant avec Mystory.</h2>
	</div>
	<div class="right-size">
	<h1>Register</h1>

		<button class="btn btn-primary btn-icon">
			<Icon src={Envelope} size="18" />Create an account
		</button>

		<div class="two-button">
			<button class="btn btn-secondary"> <span>Login</span></button>
		</div>
	</div>
</div>
