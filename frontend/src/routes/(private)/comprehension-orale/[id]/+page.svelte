<script lang="ts">
	import { goto } from '$app/navigation';
	import { superFormDefaultConfig } from '@tcf/models/forms/commonSchema';
	import { listeningComprehensionSchema } from '@tcf/models/forms/mcqSchema';
	import { zod } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import BackButton from '@tcf/lib/components/Atoms/BackButton.svelte';
	import { page } from '$app/state';
	import { addErrorToast } from '@tcf/lib/helpers/toastHelper';

	const { data }: { data: PageData } = $props();

	let index = $state(0);

	const suprForm = superForm(data.form, {
		validators: zod(listeningComprehensionSchema),
		...superFormDefaultConfig,
		resetForm: true,

		async onResult({ result }) {
			if (result.type === 'success') {
				await goto(`${page.url.pathname}/recapitulatif`);
			}
		},
		onError({
			result: {
				error: { message }
			}
		}) {
			addErrorToast(message);
		}
	});
	const { form, enhance } = suprForm;
	let selectedResponse = $state(null);

	function goToNextQuestion() {
		$form.userResponses.push(selectedResponse);
		$form.userResponses = $form.userResponses;

		if (index + 1 < data.exam.length) {
			index += 1;
			selectedResponse = null;
		}
	}
</script>

<div class="container">
	<div class="card">
		<div class="top-card">
			<BackButton />
			<h1 class="card-title">{data.title}</h1>
		</div>

		<div class="timer-tips-wrapper">
			<div class="bar-wrapper"></div>
			<div class="tips-wrapper">
				<button class="btn btn-quaternary">Tips</button>
			</div>
		</div>

		<form enctype="multipart/form-data" method="POST" autocomplete="off" use:enhance>
			<div class="radios">
				<span class="question">{data.exam[index].question}</span>
				<div class="options">
					{#each data.exam[index].responses as responseChoice, responseIndex}
						<div class="radio">
							<label for="userResponses[{responseIndex}]">
								<input
									bind:group={selectedResponse}
									type="radio"
									id="userResponses[{responseIndex}]"
									name="userResponses[{responseIndex}]"
									value={responseIndex} />
								<span>{responseChoice} {responseIndex}</span>
							</label>
						</div>
					{/each}
				</div>
			</div>

			<div class="bottom-card-buttons">
				{#if index + 1 === data.exam.length}
					<button type="submit" class="btn btn-tertiary">Skip</button>
				{:else}
					<button onclick={goToNextQuestion} class="btn btn-tertiary">Skip</button>
				{/if}
				<span class="question-count">{index + 1}/{data.exam.length}</span>
				{#if index + 1 === data.exam.length}
					<button type="submit" onclick={goToNextQuestion} class="btn btn-primary btn-small">Submit</button>
				{:else}
					<button type="button" onclick={goToNextQuestion} class="btn btn-primary btn-small">Next</button>
				{/if}
			</div>
		</form>
	</div>
</div>

<style lang="scss">
	.container {
		justify-items: center;
		padding-top: rem(24);
		.card {
			display: flex;
			max-width: 100%;
			flex-direction: column;
			gap: rem(24);
			border: rem(1) solid var(--white);
			border-radius: rem(12);
			padding: rem(24);
			background-color: var(--bg-card-grey);

			@include min-width(tablet) {
				width: min-content;
				min-width: rem(500);
			}

			.top-card {
				display: flex;
				align-items: center;
				gap: rem(8);
				.card-title {
					font-size: var(--text-2xl);
					line-height: rem(32);
				}
			}

			.timer-tips-wrapper {
				display: grid;
				grid-template-columns: 1fr auto;
				.bar-wrapper {
					border-right: 2px solid white;
					padding-right: rem(16);
					align-content: center;
				}
				.tips-wrapper {
					padding: 0 rem(12);
				}
			}

			.bottom-card-buttons {
				margin: rem(48) rem(32) 0 rem(32);
				display: flex;
				justify-content: space-between;
				align-items: center;

				.question-count {
					background-color: var(--correct-input);
					padding: rem(4) rem(12);
					border-radius: rem(24);
					color: #000;
					font-weight: 600;
				}
			}
		}
	}
</style>
