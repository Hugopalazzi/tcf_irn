<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { m } from '$lib/paraglide/messages.js';

	type Props = {
		progress: number;
		largeProgressBar?: boolean;
		filledClass?: 'secondary' | 'primary';
		emptyClass?: 'opaque-white' | 'grey';
	};

	const { progress, largeProgressBar = false, filledClass = 'primary', emptyClass = 'grey' }: Props = $props();

	const bem = createBEM('progress-bar');
	const emptyBarWidth = 100 - progress;
</script>

<div
	class={bem('container', { large: largeProgressBar })}
	role="progressbar"
	aria-valuenow={progress}
	aria-valuemin="0"
	aria-valuemax="100"
	aria-label={m.ariaProgressBar()}>
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

			&--large {
				min-width: 230px;
			}
		}
	}

	@media (min-width: $breakpoint-tablet) {
		.progress-bar {
			&__container {
				min-width: 156px;

				&--large {
					min-width: 550px;
				}
			}
		}
	}
</style>
