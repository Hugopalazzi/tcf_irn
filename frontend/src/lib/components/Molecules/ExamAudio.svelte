<script lang="ts">
	import { onMount } from 'svelte';
	import PauseIcon from '@tcf/lib/components/Icons/PauseIcon.svelte';
	import PlayIcon from '@tcf/lib/components/Icons/PlayIcon.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import SoundIcon from '@tcf/lib/components/Icons/SoundIcon.svelte';
	import SoundMutedIcon from '@tcf/lib/components/Icons/SoundMutedIcon.svelte';

	let {
		audioUrl
	}: {
		audioUrl: string;
	} = $props();

	let currentTime = $state(0);
	let duration = $state(0);
	let volume = $state();
	let paused = $state(true);
	let normalizedAudioLevels: number[] = $state([]);
	let audio: HTMLAudioElement;

	const bem = createBEM('exam-audio');

	onMount(async () => {
		normalizedAudioLevels = await getAudioLevels();
	});

	const getAudioLevels = async (): Promise<number[]> => {
		const audioCtx = new AudioContext();

		const response = await fetch(audioUrl);
		const arrayBuffer = await response.arrayBuffer();
		const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

		const channelData = audioBuffer.getChannelData(0);
		const sampleRate = audioBuffer.sampleRate;
		const duration = audioBuffer.duration;

		const sliceDuration = duration / 18;
		const samplesPerSlice = Math.floor(sampleRate * sliceDuration);
		const numSlices = Math.floor(channelData.length / samplesPerSlice);

		const volumePerSlice: number[] = [];

		for (let i = 0; i < numSlices; i++) {
			const start = i * samplesPerSlice;
			const end = start + samplesPerSlice;
			const slice = channelData.slice(start, end);

			const rms = Math.sqrt(slice.reduce((sum, val) => sum + val * val, 0) / slice.length);
			volumePerSlice.push(rms);
		}

		const max = Math.max(...volumePerSlice);
		if (max === 0) return volumePerSlice.map(() => 0);

		return volumePerSlice.map((val) => val / max);
	};

	function getBarColor(index: number): number {
		const barDuration = duration / normalizedAudioLevels.length;
		const barStartTime = index * barDuration;
		const barEndTime = barStartTime + barDuration;

		if (currentTime >= barEndTime) return 1;
		if (currentTime < barStartTime) return 0;

		return (currentTime - barStartTime) / barDuration;
	}
</script>

<div class={bem('container')}>
	<audio
		bind:this={audio}
		src={audioUrl}
		bind:currentTime
		bind:duration
		bind:paused
		bind:volume
		onended={() => {
			currentTime = 0;
		}}>
	</audio>

	<button class={bem('pause')} aria-label={paused ? 'play' : 'pause'} onclick={() => (paused = !paused)}>
		{#if paused}
			<PlayIcon responsive={true} />
		{:else}
			<PauseIcon responsive={true} />
		{/if}
	</button>

	<div class={bem('volume-bar-wrapper')}>
		{#each normalizedAudioLevels as level, index}
			<div class={bem('bar')}>
				<div
					class={bem('bar-fill')}
					style="
					width: {getBarColor(index) * 100}%;
					height: {Math.max(level * 24, 4)}px;
					background-color: {getBarColor(index) > 0 ? '#1e0c5b' : '#D9D9D9'};
				">
				</div>
			</div>
		{/each}
	</div>

	<button
		class={bem('sound-icon')}
		onclick={() => {
			volume = !volume;
		}}>
		{#if volume}
			<SoundIcon responsive={true} />
		{:else}
			<SoundMutedIcon responsive={true} />
		{/if}
	</button>
</div>

<style lang="scss">
	.exam-audio {
		&__container {
			display: flex;
			padding: rem(8) rem(8) rem(8) rem(16);
			justify-content: space-between;
			align-items: center;
			border-radius: rem(12);
			width: 100%;
			border: 1px solid #dcdcdc;
			gap: 4px;
			box-sizing: border-box;
			background: #fff;
		}

		&__sound-icon {
			border-radius: rem(12);
			background: #1e0c5b;
			padding: rem(12);
		}

		&__volume-bar-wrapper {
			display: flex;
			align-items: center;
			gap: 0.125rem;
			height: rem(24);
		}

		&__bar {
			border-radius: rem(28);
			background-color: #d9d9d9;
			width: rem(4);
			min-height: rem(4);
			transition:
				height 0.2s,
				background-color 0.2s;
		}
		&__bar-fill {
			transition:
				width 0.01s linear,
				background-color 0.2s;

			border-radius: rem(28);
		}
	}

	@media (min-width: $breakpoint-mobile) {
		.exam-audio {
			&__container {
				gap: rem(32);
				width: max-content;
			}
		}
	}
</style>
