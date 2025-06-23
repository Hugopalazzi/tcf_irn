<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import TimerIcon from '@tcf/lib/components/Icons/TimerIcon.svelte';
	import { mergeClassNames } from '@tcf/lib/helpers/mergeClassNames';

	export type TimerProps = {
		totalTime: number; // in seconds now
		warningThreshold: number; // also in seconds
		onTimerEnd: () => void;
		additionalClass?: string;
	};

	const { totalTime, warningThreshold, onTimerEnd, additionalClass }: TimerProps = $props();
	const bem = createBEM('timer');

	let remaining = $state(totalTime); // in seconds

	const time = $derived({
		minutes: Math.floor(remaining / 60)
			.toString()
			.padStart(2, '0'),
		seconds: (remaining % 60).toString().padStart(2, '0')
	});

	let isInWarning = $derived(remaining <= warningThreshold && remaining > 0);
	let timerEnded = false;

	$effect(() => {
		if (remaining <= 0 || timerEnded) return;

		const interval = setInterval(() => {
			remaining -= 1;

			if (remaining <= 0 && !timerEnded) {
				timerEnded = true;
				clearInterval(interval);
				onTimerEnd?.();
			}
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class={mergeClassNames(bem('container', { warning: isInWarning }), additionalClass)} aria-live="polite" role="timer">
	<TimerIcon color={isInWarning ? '#f14336' : '#000'} />
	<span>{time.minutes}</span>
	<span>:</span>
	<span>{time.seconds}</span>
</div>

<style lang="scss">
	.timer {
		&__container {
			display: flex;
			gap: rem(8);
			font-weight: 700;
			align-items: center;

			&.align-right {
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
			}

			&--warning {
				color: $cancel;
				animation: pulse 1s infinite;
			}
		}

		@keyframes pulse {
			0%,
			100% {
				transform: scale(1);
			}
			50% {
				transform: scale(1.3);
			}
		}
	}
</style>
