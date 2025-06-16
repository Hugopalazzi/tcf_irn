<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';

	interface QuestionStepperProps {
		currentQuestion: number;
		questionsLength?: number;
	}
	let { currentQuestion = $bindable(), questionsLength = 20 }: QuestionStepperProps = $props();

	const bem = createBEM('question-stepper');

	let questionRefs: (HTMLDivElement | null)[] = [];

	$effect(() => {
		const activeElement = questionRefs[currentQuestion];
		activeElement?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
	});

	const setQuestionRef = (element: HTMLDivElement, index: number) => {
		questionRefs[index] = element;
	};

	const setRef = (node: HTMLDivElement, index: number) => {
		setQuestionRef(node, index);
		return {
			destroy() {
				questionRefs[index] = null;
			}
		};
	};
	let wrapperRef: HTMLDivElement | null = null;

	const handleWheel = (event: WheelEvent) => {
		if (wrapperRef) {
			if (event.deltaY !== 0) {
				event.preventDefault();
				wrapperRef.scrollLeft += 1.5 * event.deltaY;
			}
		}
	};
</script>

<div bind:this={wrapperRef} class={bem('wrapper')} onwheel={handleWheel}>
	{#each { length: questionsLength } as _, i}
		<div use:setRef={i} class={bem('question', { active: currentQuestion >= i })}>{String(i + 1).padStart(2, '0')}</div>
	{/each}
</div>

<style lang="scss">
	.question-stepper {
		&__wrapper {
			display: inline-flex;
			align-items: center;
			gap: rem(12);
			overflow-x: auto;
			scroll-behavior: smooth;
			scrollbar-width: none;
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
