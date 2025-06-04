<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { examStarNumber, type ExamLevelType } from '@tcf/models/exams';
	import StarIcon from '@tcf/lib/components/Icons/StarIcon.svelte';
	import { m } from '$lib/paraglide/messages.js';

	let { difficulty }: { difficulty: ExamLevelType } = $props();
	const bem = createBEM('level-star');
</script>

<div class={bem()}>
	<div>
		<p class="{bem('level')} level--{difficulty}">{m[`experience.${difficulty}`]()}</p>
		{#each { length: examStarNumber[difficulty] } as _}
			<StarIcon />
		{/each}
	</div>
	<button class={bem('btn')}>{m.start()}</button>
</div>

<style lang="scss">
	.level-star {
		display: flex;
		justify-content: space-between;

		&__level {
			font-size: rem(14);
			font-weight: bold;
			margin-bottom: rem(8);
		}

		&__btn {
			background-color: $primary-color;
			color: white;
			padding: rem(4) rem(8);
			border-radius: rem(16);
		}
	}
	.level--easy {
		color: #68cacf;
	}

	.level--intermediate {
		color: #03a7af;
	}

	.level--advanced {
		color: #03a7af;
	}

	.level--hard {
		color: #025458;
	}
	.level--expert {
		color: #3a317e;
	}
</style>
