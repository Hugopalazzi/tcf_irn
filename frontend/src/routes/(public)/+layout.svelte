<script lang="ts">
	import '@tcf/styles/styles.scss';
	import ToastHolder from '@tcf/toast/ToastHolder.svelte';

	let { children } = $props();
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
