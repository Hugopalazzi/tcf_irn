<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { m } from '$lib/paraglide/messages.js';

	type Props = {
		progress: number;
		filledClass?: 'secondary' | 'primary';
		emptyClass?: 'opaque-white' | 'grey';
	};

	const { progress, filledClass = 'primary', emptyClass = 'grey' }: Props = $props();

	const bem = createBEM('progress-bar');
	const emptyBarWidth = $derived(100 - progress);
</script>

<div class={bem('container')} role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" aria-label={m.ariaProgressBar()}>
	<div class={`${bem('filled')} ${filledClass}`} style="width: {progress}%"></div>
	{#if emptyBarWidth !== 0}
		<div class={`${bem('empty')} ${emptyClass}`} style="width: {emptyBarWidth}%"></div>
	{/if}
</div>

<style lang="scss">
	.secondary {
		background-color: #a3e7fc;
	}

	.opaque-white {
		background-color: rgba(255, 255, 255, 0.5);
	}

	.primary {
		background-color: #1e0c5b;
	}

	.grey {
		background-color: #d9d9d9;
	}

	.progress-bar {
		&__container {
			min-width: 78px;
			display: flex;
			width: 100%;
			gap: rem(4);
			height: rem(8);
			border-radius: 10px;
			overflow: hidden;
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.progress-bar {
			&__container {
				min-width: 156px;
			}
		}
	}
</style>
