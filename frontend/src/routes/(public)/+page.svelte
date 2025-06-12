<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '@tcf/lib/components/Atoms/Button.svelte';
	import ChoiceButton from '@tcf/lib/components/Atoms/ChoiceButton.svelte';
	import ChoicesGroup from '@tcf/lib/components/Molecules/ChoicesGroup.svelte';
	import { statusEnum } from '@tcf/models/global';
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
	<ChoicesGroup
		choices={[
			{ label: 'Madrid', optionPrefix: 'A', status: statusEnum.SUCCESS },
			{ label: 'Paris', optionPrefix: 'B' },
			{ label: 'Paris', optionPrefix: 'C' },
			{ label: 'Paris', optionPrefix: 'D' }
		]} />
</div>
