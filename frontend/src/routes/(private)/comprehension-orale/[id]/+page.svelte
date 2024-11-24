<script lang="ts">
	import BackButton from '@tcf/lib/widgets/BackButton.svelte';
	import type { PageData } from './$types';
	import MeltProgressBar from '$lib/widgets/MeltProgressBar.svelte';
    import { superForm } from 'sveltekit-superforms/client';
	import { superFormDefaultConfig } from '@tcf/models/forms/commonSchema';
	import { listeningComprehensionSchema } from '@tcf/models/forms/mcqSchema';
	import { zod } from 'sveltekit-superforms/adapters';

	const { data }: { data: PageData } = $props();

	const suprForm = superForm(data.form, {
		validators: zod(listeningComprehensionSchema),
		...superFormDefaultConfig,
		resetForm: true,

		async onResult({ result }) {
			// if (result.type === 'success') {
			//     await goto('.').then(() => addSuccessToast(`L'action "${$form.title}" a bien été créé.`));
			// }
		},
		onError({ result }) {
			// if (result.error.message) {
			//     addErrorToast(result.error.message);
			// } else {
			//     addErrorToast();
			// }
		}
	});
	const { form, errors, enhance, isTainted, submitting } = suprForm;
</script>

<div class="container">
	<div class="card">
		<div class="top-card">
			<BackButton />
			<h1 class="card-title">{data.title}</h1>
		</div>

		<div class="timer-tips-wrapper">
			<div class="bar-wrapper">
				<MeltProgressBar />
			</div>
			<div class="tips-wrapper"><button class="btn btn-quaternary">Tips</button></div>
		</div>

		<div class="radios">
			<form enctype="multipart/form-data" method="POST" autocomplete="off" use:enhance>
				<span class="question">Quel est la couleur qui était question 4 ?</span>
				<div class="options">
					<div class="radio">
						<label for="response1"
							><input type="radio" id="response1" value={1} />
							<span>test</span>
						</label>
					</div>
					<div class="radio">
						<label for="response2"
							><input type="radio" id="response2" value={2} />
							<span>test</span>
						</label>
					</div>
					<div class="radio">
						<label for="response3"
							><input type="radio" id="response3" value={3} />
							<span>test</span>
						</label>
					</div>
					<div class="radio">
						<label for="response4"
							><input type="radio" id="response4" value={4} />
							<span>test</span>
						</label>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		justify-items: center;
		padding-top: rem(24);
		.card {
			display: flex;
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

			.exam-wrapper {
				.question {
					font-size: var(--text-xl);
					font-weight: 600;
				}
			}
		}
	}
</style>
