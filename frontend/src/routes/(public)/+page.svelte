<script lang="ts">
	import { Envelope, Icon } from 'svelte-hero-icons';
	import Multiselect from './Multiselect.svelte';
	import GoogleIcon from './GoogleIcon.svelte';
	import { goto } from '$app/navigation';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/state';


	const {data} = $props();

	$inspect(data.userProfile )
</script>

<div class="page-container">
	<div class="left-size">
		<img class="logo" src="/assets/images/logo_my_story.png" alt="My story" />
		<h5>Apprenez le francais en vous amusant avec Mystory.</h5>
	</div>
	<div class="right-size">
		<Multiselect />

		<button
			on:click={() => {
				goto('/inscription');
			}}
			class="btn btn-primary btn-icon"
		>
			<Icon src={Envelope} size="18" />Create an account
		</button>

		<button on:click={() => signOut()}>signout</button>

		<div class="two-button">
			<button on:click={() => signIn('google')}>google</button>
			<!-- <form class="auth-form" method="post" action="?/OAuth2">
				<div>
					<button class="btn-auth"  type="submit">
					<img class="btn-auth-img"  alt='google sign in'/>
					</button>
				</div>
		
			</form>  -->
			<button
				on:click={() => {
					goto('/login');
				}}
				class="btn btn-secondary"
			>
				<span>Login</span></button
			>
		</div>
	</div>
</div>
