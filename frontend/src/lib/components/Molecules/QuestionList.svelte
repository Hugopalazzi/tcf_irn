<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { m } from '@tcf/lib/paraglide/messages';

	interface QuestionListProps {
		actualQuestion: number;
		questionNumber?: number;
	}
	let { actualQuestion = $bindable(), questionNumber = 20 }: QuestionListProps = $props();

	const bem = createBEM('question-list');

	let questionRefs: (HTMLDivElement | null)[] = [];

	$effect(() => {
		const activeEl = questionRefs[actualQuestion];
		activeEl?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
	});

	function setQuestionRef(el: HTMLDivElement, index: number) {
		questionRefs[index] = el;
	}

	function setRef(node: HTMLDivElement, index: number) {
		setQuestionRef(node, index);
		return {
			destroy() {
				questionRefs[index] = null;
			}
		};
	}
</script>

<div class={bem('wrapper')}>
	{#each { length: questionNumber } as _, i}
		<div use:setRef={i} class={bem('question', { active: actualQuestion >= i })}>{m['questionList.q']({ count: i + 1 })}</div>
	{/each}
</div>

<style lang="scss">
	.question-list {
		&__wrapper {
			display: inline-flex;
			align-items: center;
			gap: rem(12);
			overflow-x: auto;
			scroll-behavior: smooth;
			scrollbar-width: none;
			margin-bottom: rem(20);
		}

		&__question {
			display: flex;
			padding: rem(12) rem(28);
			justify-content: center;
			align-items: center;
			font-size: rem(14);
			gap: rem(8);
			border-radius: rem(20);
			font-weight: 700;
			white-space: nowrap;
			color: #c0c0c0;
			border: 1px solid #dcdcdc;

			&--active {
				background: $secondary-color;
				border: 0;
				color: black;
			}
		}
	}
</style>
