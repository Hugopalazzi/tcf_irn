<script lang="ts">
	import { onMount } from 'svelte';
	import PauseIcon from '../Icons/PauseIcon.svelte';
	import PlayIcon from '../Icons/PlayIcon.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import SoundIcon from '../Icons/SoundIcon.svelte';

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
			<PlayIcon />
		{:else}
			<PauseIcon />
		{/if}
	</button>

	<div class={bem('volume-bar-wrapper')}>
		{#each normalizedAudioLevels as level}
			<div class={bem('bar')} style="height: {Math.max(level * 40, 4)}px;"></div>
		{/each}
	</div>

	<button
		class={bem('mute-icon')}
		onclick={() => {
			volume = !volume;
		}}>
		<SoundIcon />
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
			border: 1px solid #dcdcdc;
			background: #fff;
			gap: rem(32);
		}

		&__mute-icon {
			border-radius: rem(12);
			background: #1e0c5b;
			padding: rem(12);
		}

		&__volume-bar-wrapper {
			display: flex;
			gap: rem(4);
			align-items: center;
			height: 48px;
		}

		&__bar {
			border-radius: 28px;
			background: #1e0c5b;
			width: 4px;
			min-height: 4px;
			transition:
				height 0.2s,
				background-color 0.2s;
		}
	}
</style>
