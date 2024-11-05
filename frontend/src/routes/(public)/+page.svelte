<script lang="ts">
	import { Envelope, Icon } from 'svelte-hero-icons';
	import Multiselect from './Multiselect.svelte';
	import GoogleIcon from './GoogleIcon.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="page-container">
	<div class="left-size">
		<img class="logo" src="/assets/images/logo_my_story.png" alt="My story" />
		<h5>Apprenez le francais en vous amusant avec Mystory.</h5>
	</div>
	<div class="right-size">
		<Multiselect />

		<button on:click={()=>{goto('/inscription')}} class="btn btn-primary btn-icon">
			<Icon src={Envelope} size="18" />Create an account
		</button>

		<div class="two-button">
			<button class="btn btn-secondary btn-icon"> <GoogleIcon /></button>
			<button  on:click={()=>{goto('/login')}}  class="btn btn-secondary"> <span>Login</span></button>
		</div>
	</div>
</div>

