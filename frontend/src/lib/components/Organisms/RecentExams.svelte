<script lang="ts">
	import Button from '@tcf/lib/components/Atoms/Button.svelte';
	import CheckboxInput from '@tcf/lib/components/Molecules/CheckboxInput.svelte';
	import InputPassword from '@tcf/lib/components/Molecules/InputPassword.svelte';
	import InputTextWrapperForm from '@tcf/lib/components/Molecules/InputTextWrapperForm.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { m } from '$lib/paraglide/messages.js';
	import type { SuperForm } from 'sveltekit-superforms';
	import FrameCard from './FrameCard.svelte';

	const MAX_GRADE_DEFAULT = 20;

	interface Exam {
		title: string;
		daysAgo: number;
		grade: number;
		link: string;
		maxGrade?: number;
	}

	interface Props {
		title: string;
		description?: string;
		exams: {
			listeningExam: Exam;
			readingExam: Exam;
			writingExam: Exam;
		};
	}

	const { exams, title, description }: Props = $props();

	const bem = createBEM('recent-exams');
</script>

<FrameCard {title} {description}>
	<div class={bem('container')}>
		{#each Object.entries(exams) as [examType, exam]}
			<div class={bem('current-exam')}>
				<div class={bem('text-container')}>
					<h3 class={bem('exam-title')}>{m[`recentExams.${examType}.title`]()}</h3>
					<div class={bem('info')}>
						<!-- TODO -->
						<span class={bem('date')}>{m['recentExams.daysAgo']({ days: exam.daysAgo })}</span>
						<a class={bem('exam-link')} href={exam.link}>{m['recentExams.viewExamLabel']()}</a>
					</div>
				</div>
				<span class={bem('exam-result')}>
					{`${exam.grade}/${exam.maxGrade || MAX_GRADE_DEFAULT}`}
				</span>
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
