<script lang="ts">
	import { createSelect, melt } from '@melt-ui/svelte';
	import { ChevronDown, ChevronUp, Icon } from 'svelte-hero-icons';
	import Multiselect from './Multiselect.svelte';

	interface MultiSelectOption {
		value: string;
		label: string;
	}

	const meltOptions: MultiSelectOption[] = [
		{ label: 'English', value: 'eng' },
		{ label: 'Sri lankais', value: 'sri' },
		{ label: 'Français', value: 'fr' }
	];

	const {
		elements: { trigger, menu, option },
		states: { open, selected }
	} = createSelect<string>({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		},
		defaultSelected: { label: 'English', value: 'eng' }
	});
</script>

<div class="page-container">
	<div class="left-size">
		<img class="logo" src="/assets/images/logo_my_story.png" alt="My story" />
		<h2>Apprenez le francais en vous amusant avec Mystory.</h2>
	</div>
	<div class="right-size">
		<Multiselect />
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
			background-image: linear-gradient(to bottom right, var(--dark-purple), var(--light-purple));
		}
	}
</style>
