<script lang="ts">
	import { ArrowLeft, Icon } from 'svelte-hero-icons';
	import { goto } from '$app/navigation';

	interface Props {
		fallbackUrl?: string;
		forcedUrl?: string;
		displayText?: boolean;
	}

	let {
		fallbackUrl = '..',
		forcedUrl = '',
		displayText = false
	}: Props = $props();
</script>

<div>
	<button
		type="button"
		role="link"
		on:click={() => goto(forcedUrl ?? fallbackUrl)}
		title="Retour à la page précédente"
		class="btn btn-tertiary">
		<div class="default">
			<Icon src={ArrowLeft} size="32" />
			{#if displayText}
				<span>Retour</span>
			{/if}
			<span class="sr-only">à la page précédente</span>
		</div>
	</button>
</div>

<style lang="scss">
	.btn {
		box-shadow: unset;
	}
	.default {
		display: flex;
		align-items: center;
		gap: rem(10);
	}
</style>
