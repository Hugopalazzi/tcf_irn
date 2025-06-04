<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import ProgressBar from '@tcf/lib/components/Atoms/ProgressBar.svelte';

	interface ExamTopCardProps {
		actualQuestion: number;
		questionNumber?: number;
	}
	let { actualQuestion = $bindable(), questionNumber = 20 }: ExamTopCardProps = $props();

	const bem = createBEM('exam-top-card');
</script>

<div class={bem('container')}>
	<span class={bem('question-number')}>Question 1</span>
	<ProgressBar progress={12} />
</div>

<style lang="scss">
	.exam-top-card {
		&__container {
			display: flex;
		}

		&__question-number {
			font-weight: 400;
			color: rgba(0, 0, 0, 0.5);
			font-size: rem(14);
		}
	}
</style>
