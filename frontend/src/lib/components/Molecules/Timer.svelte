<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import TimerIcon from '@tcf/lib/components/Icons/TimerIcon.svelte';

	export type TimerProps = {
		totalTime: number;
		warningThreshold: number;
		onTimerEnd: () => void;
	};

	const { totalTime, warningThreshold, onTimerEnd }: TimerProps = $props();
	const bem = createBEM('timer');

	let remaining = $state(totalTime);

	const time = $derived({
		minutes: Math.floor(remaining / 60000)
			.toString()
			.padStart(2, '0'),
		seconds: Math.floor((remaining % 60000) / 1000)
			.toString()
			.padStart(2, '0')
	});

	let isInWarning = $derived(remaining <= warningThreshold && remaining > 0);
	let timerEnded = false;

	$effect(() => {
		let start = performance.now();

		let frame = requestAnimationFrame(function update(time) {
			const elapsed = time - start;
			remaining = Math.max(totalTime - elapsed, 0);

			if (remaining > 0) {
				frame = requestAnimationFrame(update);
			} else if (!timerEnded) {
				timerEnded = true;
				onTimerEnd?.();
			}
		});

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<div class={bem('container', { warning: isInWarning })} aria-live="polite" role="timer">
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
