<script>
	import { Icon, SpeakerWave } from 'svelte-hero-icons';
	import ProgressBar from './ProgressBar.svelte';
</script>

<h1>List of sets</h1>

<div class="sets-list">
	<div class="set-card">
		<h2>Set 1 <Icon src={SpeakerWave} size="32" /></h2>
		<span class="exam-type"> Written comprehension</span>
		<ProgressBar goodAnwser={18} />
	</div>
	<div class="set-card">
		<h2>
			Set 2
			<Icon src={SpeakerWave} size="32" />
		</h2>
		<span class="exam-type"> Written comprehension</span>
		<ProgressBar goodAnwser={16} />
	</div>
	<div class="set-card">
		<h2>
			Set 3
			<Icon src={SpeakerWave} size="32" />
		</h2>
		<span class="exam-type"> Written comprehension</span>
		<ProgressBar goodAnwser={15} />
	</div>
	<div class="set-card">
		<h2>
			Set 4
			<Icon src={SpeakerWave} size="32" />
		</h2>
		<span class="exam-type"> Written comprehension</span>
		<ProgressBar goodAnwser={11} />
	</div>
	<div class="set-card">
		<h2>
			Set 5
			<Icon src={SpeakerWave} size="32" />
		</h2>
		<span class="exam-type"> Written comprehension</span>
		<ProgressBar goodAnwser={7} />
	</div>
	<div class="set-card">
		<h2>
			Set 6
			<Icon src={SpeakerWave} size="32" />
		</h2>
		<span class="exam-type"> Written comprehension</span>
		<ProgressBar goodAnwser={4} />
	</div>
	<div class="set-card">
		<h2>
			Set 7
			<Icon src={SpeakerWave} size="32" />
		</h2>
		<span class="exam-type"> Written comprehension</span>
		<ProgressBar goodAnwser={2} />
	</div>
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
			padding: rem(12);

			.exam-type {
				color: var(--title-card-grey);
			}
		}
	}
</style>
