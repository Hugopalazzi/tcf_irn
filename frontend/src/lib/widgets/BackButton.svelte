<script lang="ts">
	import { ArrowLeft, Icon } from 'svelte-hero-icons';
	import { historyManager } from '$lib/widgets/history.store';

	export let fallbackUrl = '..';
	export let forcedUrl = '';
</script>

<div class="button-return">
	<button
		type="button"
		role="link"
		on:click={() => $historyManager.back(forcedUrl || fallbackUrl)}
		title="Retour à la page précédente"
		class="btn btn-tertiary"
	>
		<slot>
			<div class="default">
				<Icon src={ArrowLeft} size="18" />
				<span>Retour</span>
				<span class="sr-only">à la page précédente</span>
			</div>
		</slot>
	</button>
</div>

<style lang="scss">
	.button-return {
		margin-bottom: rem(8);
	}

	.btn {
		box-shadow: unset;
	}
	.default {
		display: flex;
		align-items: center;
		gap: rem(10);
	}
</style>
