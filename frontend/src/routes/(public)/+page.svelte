<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '@tcf/lib/components/Atoms/Button.svelte';
</script>

<div>
	<Button
		onClick={() => {
			goto('/registration');
		}}
		extraClass="centered-submit-button"
		color="primary"
		label="Se créer un compte"></Button>
	<Button
		onClick={() => {
			goto('/login');
		}}
		extraClass="centered-submit-button"
		color="secondary"
		label="Se connecter"></Button>
</div>
