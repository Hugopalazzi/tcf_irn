import type { Actions } from '@sveltejs/kit';
import { listeningComprehensionSchema } from '@tcf/models/forms/mcqSchema.js';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async ({ params }) => {
	const title = ` Module ${params.id}`;

	const form = await superValidate(zod(listeningComprehensionSchema));

	const exam: {
		audio: string;
		question: string;
		responses: string[];
	}[] = [
		{
			audio: '/src/static/audio/test',
			question: 'Quel est la couleur du cheval ?',
			responses: ['chat', 'chien', 'cheval', 'canard']
		},
		{
			audio: '/src/static/audio/test',
			question: "Comment tu t'appel ?",
			responses: ['Jean', 'Malouche', 'Cor', 'Hugo']
		},
		{
			audio: '/src/static/audio/test',
			question: "cc tu t'appel ?",
			responses: ['c', 'Malouche', 'Cor', 'Hugo']
		}
	];
	return {
		form,
		title,
		exam
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const requestFormData = await request.formData();
		const superForm = await superValidate(requestFormData, zod(listeningComprehensionSchema));

		return {
			form: superForm,
			success: true,
			status: 200,
			statusText: 'Out Of Apples'
		};
	}
};
