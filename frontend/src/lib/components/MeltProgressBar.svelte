<script lang="ts">
	import { createProgress, melt } from '@melt-ui/svelte';
	import { writable } from 'svelte/store';

	const value = writable(100);

	const {
		elements: { root },
		options: { max }
	} = createProgress({
		value,
		max: 100
	});

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	sleep(1000).then(() => {
		value.set(75);
	});
</script>

<div use:melt={$root} class="progress-bar-wrapper">
	<div
		class="bar"
		style={`transform: translateX(-${100 - (100 * ($value ?? 0)) / ($max ?? 1)}%)`}
	/>
</div>

<style lang="scss">
	.progress-bar-wrapper {
		overflow: hidden;
		position: relative;
		height: 1.5rem;
		width: 100%;
		border: 1px solid var(--var-grey-200);
		border-radius: rem(16);
		.bar {
			width: 100%;
			height: 100%;
			transition-property: transform;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 300ms;
			background: var(--button-primary-color);
			border-radius: rem(16);
		}
	}
</style>
