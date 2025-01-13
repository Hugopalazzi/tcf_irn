<script lang="ts">
	import { invalidate } from '$app/navigation';
	import '@tcf/styles/styles.scss';
	import ToastHolder from '@tcf/toast/ToastHolder.svelte';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div class="wrapper">
	<div class="wrapper__body">
		<main id="contenu-site">
			<div class="toast-container">
				<div class="toasts">
					<ToastHolder />
				</div>
			</div>
			{@render children()}
		</main>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		min-height: 100vh;
		justify-content: center;
	}

	main {
		padding: rem(24);
		height: 100%;
		box-sizing: border-box;

		.toast-container {
			position: relative;
		}

		.toasts {
			top: rem(-40);
			position: absolute;
			z-index: 1;
			width: 100%;
		}
	}
</style>
