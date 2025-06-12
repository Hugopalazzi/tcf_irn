<script lang="ts">
	import { statusEnum, type StatusType } from '@tcf/models/global';
	import ChoiceButton from '../Atoms/ChoiceButton.svelte';

	type Choice = {
		optionPrefix: string;
		label: string;
		status?: StatusType;
	};

	interface Props {
		choices: Choice[];
	}

	let { choices }: Props = $props();
	const initialStatus = choices.map((choice) => choice.status || statusEnum.NONE);
	let choicesStatus = $state(initialStatus);

	const onClickButton = (i: number) => {
		const currentStatus = choicesStatus[i];
        //Unclikable for results question
		if (currentStatus === statusEnum.UNCLICKABLE) {
			return;
		}
        //if current status is none (not clicked yet)
		if (currentStatus === statusEnum.NONE) {
			choicesStatus = choicesStatus.map((status) => {
				//reset status that were selected to NONE
				if (status === statusEnum.SELECTED) {
					return statusEnum.NONE;
				}
				return status;
			});
			choicesStatus[i] = statusEnum.SELECTED;
		}
	};
</script>

<div class="choices-group">
	{#each choices as { optionPrefix, label }, i}
		<ChoiceButton {label} {optionPrefix} onClick={() => onClickButton(i)} status={choicesStatus[i]} />
	{/each}
</div>

<style lang="scss">
	.choices-group {
		display: grid;
		grid-template-columns: 1fr;
		gap: rem(20);
	}

	@media (min-width: $breakpoint-tablet) {
		.choices-group {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
