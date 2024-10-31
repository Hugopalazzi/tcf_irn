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
		<h1 class="title">Register</h1>

		<div class="input-wrapper">
			<label for="email"> Your email </label>
			<input id="email" name="email" placeholder="john.doe@mail.com" />
		</div>
		<div class="input-wrapper">
			<label for="username"> Your username </label>
			<input id="username" name="username" placeholder="johndoe" />
		</div>
		<div class="input-wrapper">
			<label for="password"> Set password </label>
			<input type="password" id="password" name="password" placeholder="New password" />
		</div>
		<div class="input-wrapper">
			<label for="password-confirmation"> Password confirmation </label>
			<input
				type="password"
				id="password-confirmation"
				name="password-confirmation"
				placeholder="Password confirmation"
			/>
		</div>

		<button class="btn btn-primary btn-icon">
			<Icon src={Envelope} size="18" />Sign Up
		</button>
	</div>
</div>
