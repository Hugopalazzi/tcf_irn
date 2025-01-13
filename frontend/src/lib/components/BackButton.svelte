<script lang="ts">
	import { ArrowLeft, Icon } from 'svelte-hero-icons';
	import { historyManager } from '@tcf/lib/components/history.store';

	interface Props {
		fallbackUrl?: string;
		forcedUrl?: string;
		displayText?: boolean;
	}

	let { fallbackUrl = '..', forcedUrl = '', displayText = false }: Props = $props();
</script>

<div>
	<button
		type="button"
		role="link"
		on:click={() => $historyManager.back(forcedUrl || fallbackUrl)}
		title="Retour à la page précédente"
		class="btn btn-tertiary"
	>
		<slot>
			<div class="default">
				<Icon src={ArrowLeft} size="32" />
				{#if displayText}
					<span>Retour</span>
				{/if}
				<span class="sr-only">à la page précédente</span>
			</div>
		</slot>
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
