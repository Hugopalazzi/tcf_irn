<script>
	import { Icon, SpeakerWave } from 'svelte-hero-icons';
</script>

<h1>List of sets</h1>

<div class="sets-list">
	<div class="set-card">
		<h2>Set 1</h2>
		<span class="exam-type"> Written comprehension</span>
		<div>Progress bar</div>
	</div>
	<div class="set-card">
		<h2>Set 2</h2>
		<span class="exam-type"> Written comprehension</span>
		<div>Progress bar</div>
	</div>
	<div class="set-card">
		<h2>Set 3</h2>
		<span class="exam-type"> Written comprehension</span>
		<div>Progress bar</div>
	</div>
	<div class="set-card">
		<h2>Set 4</h2>
		<span class="exam-type"> Written comprehension</span>
		<div>Progress bar</div>
	</div>
	<div class="set-card">
		<h2>Set 5</h2>
		<span class="exam-type"> Written comprehension</span>
		<div>Progress bar</div>
	</div>
	<div class="set-card">
		<h2>Set 6</h2>
		<span class="exam-type"> Written comprehension</span>
		<div>Progress bar</div>
	</div>
	<div class="set-card">
		<Icon src={SpeakerWave} size="18" />
		<h2>Set 7</h2>
		<span class="exam-type"> Written comprehension</span>
		<div>Progress bar</div>
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
