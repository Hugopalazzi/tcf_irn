<script lang="ts">
	import LevelStar from '@tcf/lib/components/Molecules/LevelStar.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { type Exam, type ExamLevelType } from '@tcf/models/exams.js';
	import { m } from '$lib/paraglide/messages.js';

	let { data } = $props();

	const bem = createBEM('listening-comprehension');
	const entries = Object.entries(data.listeningComprehensionExams) as [ExamLevelType, Exam[]][];
</script>

<h1 class={bem('title')}>{m['recentExams.listeningExam.title']()}</h1>

<section class={bem()}>
	{#each entries as [difficulty, exams] (difficulty)}
		{#if exams.length}
			<h2 class={bem('difficulty-title')}>{m[`experience.${difficulty}`]()}</h2>
			<div class={bem('exam-grid')}>
				{#each exams as exam}
					<a href={`listening-comprehension/${exam.uuid}`} class={bem('exam-card')}>
						<h3 class={bem('exam-title')}>{exam.title}</h3>
						<LevelStar {difficulty} />
					</a>
				{/each}
			</div>
		{/if}
	{/each}
</section>

<style lang="scss">
	.listening-comprehension {
		margin-bottom: 3rem;

		&__title {
			margin-bottom: rem(16);
		}

		&__difficulty-title {
			margin-bottom: rem(8);
		}

		&__exam-grid {
			display: grid;
			gap: rem(20);
			grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
			margin-bottom: rem(16);
		}

		&__exam-card {
			background: white;
			border-radius: rem(16);
			padding: rem(20);
			border: 1px solid #dcdcdc;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
			transition: transform 0.2s;

			&:hover {
				transform: translateY(-4px);
			}
		}

		&__exam-title {
			margin-bottom: 0.5rem;
		}
	}
</style>
