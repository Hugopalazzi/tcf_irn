<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';

	type Props = {
		progress: number;
		filledClass?: string;
		emptyClass?: string;
	};

	const { progress, filledClass = 'blue', emptyClass = 'opaque-white' }: Props = $props();

	const bem = createBEM('progress-bar');
</script>

<div
	class={bem('container')}
	role="progressbar"
	aria-valuenow={progress}
	aria-valuemin="0"
	aria-valuemax="100"
	aria-label={$_('component.ariaProgressBar')}>
	<div class={`${bem('filled')} ${filledClass}`} style="width: {progress}%"></div>
	<div class={`${bem('empty')} ${emptyClass}`} style="width: {100 - progress}%"></div>
</div>

<style lang="scss">
	.blue {
		background-color: #a3e7fc;
	}

	.opaque-white {
		background-color: rgba(255, 255, 255, 0.5);
	}

	.purple {
		background-color: #1e0c5b;
	}

	.grey {
		background-color: #d9d9d9;
	}

	.progress-bar {
		&__container {
			display: flex;
			width: 100%;
			gap: rem(4);
			height: rem(8);
			border-radius: 10px;
			overflow: hidden;
		}
	}
</style>
