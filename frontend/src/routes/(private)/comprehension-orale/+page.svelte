<script>
	import { Icon, SpeakerWave } from 'svelte-hero-icons';
	import ProgressBar from './ProgressBar.svelte';
</script>

<h1>List of sets</h1>

<div class="sets-list">
	<a class="set-card" href="/comprehension-orale/1">
		<h2>Set 1 <Icon src={SpeakerWave} size="32" /></h2>
		<span class="exam-type">Written comprehension</span>
		<ProgressBar goodAnwser={20} />
	</a>
	<a class="set-card" href="/comprehension-orale/2">
		<h2>
			Set 2
			<Icon src={SpeakerWave} size="32" />
		</h2>
		<span class="exam-type">Written comprehension</span>
		<ProgressBar goodAnwser={16} />
	</a>
	<a class="set-card" href="/comprehension-orale/3">
		<h2>
			Set 3
			<Icon src={SpeakerWave} size="32" />
		</h2>
		<span class="exam-type">Written comprehension</span>
		<ProgressBar goodAnwser={15} />
	</a>
	<a class="set-card" href="/comprehension-orale/4">
		<h2>
			Set 4
			<Icon src={SpeakerWave} size="32" />
		</h2>
		<span class="exam-type">Written comprehension</span>
		<ProgressBar goodAnwser={11} />
	</a>
	<a class="set-card" href="/comprehension-orale/5">
		<h2>
			Set 5
			<Icon src={SpeakerWave} size="32" />
		</h2>
		<span class="exam-type">Written comprehension</span>
		<ProgressBar goodAnwser={7} />
	</a>
	<a class="set-card" href="/comprehension-orale/6">
		<h2>
			Set 6
			<Icon src={SpeakerWave} size="32" />
		</h2>
		<span class="exam-type">Written comprehension</span>
		<ProgressBar goodAnwser={4} />
	</a>
	<a class="set-card" href="/comprehension-orale/7">
		<h2>
			Set 7
			<Icon src={SpeakerWave} size="32" />
		</h2>
		<span class="exam-type">Written comprehension</span>
		<ProgressBar goodAnwser={2} />
	</a>
</div>

<style lang="scss">
	.sets-list {
		display: flex;
		flex-wrap: wrap;
		gap: rem(24);
		padding: 0 rem(8);
		.set-card {
			background-color: var(--bg-card-grey);
			border-radius: rem(12);
			padding: rem(24);

			.exam-type {
				color: var(--title-card-grey);
			}
		}
	}
</style>
