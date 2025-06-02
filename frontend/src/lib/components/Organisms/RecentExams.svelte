<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';
	import type { ExamsType } from '@tcf/models/exams';

	const MAX_GRADE_DEFAULT = 20;

	interface Exam {
		type: ExamsType;
		daysAgo?: number;
		grade?: number;
		link?: string;
		maxGrade?: number;
	}

	interface Props {
		title: string;
		description?: string;
		exams: Array<Exam>;
	}

	const examsLinks = {
		listeningExam: '/listening-exam',
		readingExam: '/reading-exam',
		writingExam: '/writing-exam'
	};

	const { exams, title, description }: Props = $props();

	const bem = createBEM('recent-exams');
</script>

<FrameCard {title} {description}>
	<div class={bem('container')}>
		{#each exams as { type, daysAgo, grade, link, maxGrade }}
			<div class={bem('current-exam')}>
				<div class={bem('text-container')}>
					<h3 class={bem('exam-title')}>
						{m[`recentExams.${type}.title`]()}
					</h3>
					<div class={bem('info')}>
						<span class={bem('date')}>
							{#if Number.isInteger(daysAgo)}
								{daysAgo === 0 ? m['recentExams.today']() : m['recentExams.daysAgo']({ days: daysAgo })}
							{:else}
								{m['recentExams.emptyExam']()}
							{/if}
						</span>
						<a class={bem('exam-link')} href={link || examsLinks[type]}>
							{link ? m['recentExams.viewExamLabel']() : m['recentExams.startExam']()}
						</a>
					</div>
				</div>
				{#if grade}
					<span class={bem('exam-result')}>
						{`${grade}/${maxGrade || MAX_GRADE_DEFAULT}`}
					</span>
				{/if}
			</div>
		{/each}
	</div>
</FrameCard>

<style lang="scss">
	.recent-exams {
		&__container {
			display: flex;
			flex-direction: column;
			gap: rem(12);
			width: 100%;
		}

		&__current-exam {
			display: flex;
			align-self: stretch;
			justify-content: space-between;
			align-items: center;
			background-color: #f9f9f9;
			padding: rem(12);
			border-radius: rem(10);
			border: 1px solid #dcdcdc;
			background: #f9f9f9;
			box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.03);
			gap: rem(16);
		}

		&__text-container {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			flex: 1 0 0;
			align-self: stretch;
			gap: rem(4);
		}

		&__exam-link {
			color: #1e0c5b;
			font-size: rem(12);
			font-style: normal;
			font-weight: 700;
			line-height: rem(16);
		}

		&__exam-title {
			font-size: rem(14);
			font-weight: bold;
			margin: 0;
		}

		&__exam-result {
			color: #1e0c5b;
			text-align: right;
			font-size: rem(24);
			font-style: normal;
			font-weight: 700;
			line-height: rem(20);
		}

		&__info {
			display: flex;
			gap: rem(12);
		}

		&__date {
			color: #7f7f7f;
			font-size: rem(12);
			font-style: normal;
			font-weight: 500;
			line-height: rem(16);
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.recent-exams {
			&__current-exam {
				padding: rem(16);
			}

			&__exam-title {
				font-size: rem(16);
			}

			&__exam-result {
				font-size: rem(32);
			}
		}
	}
</style>
