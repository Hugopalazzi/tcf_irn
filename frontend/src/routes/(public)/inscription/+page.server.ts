import { userCreationAccountSchema } from '@tcf/models/forms/userSchema';
import { RepositoryError } from '@tcf/repositories/repository-error.js';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async () => {
	const form = await superValidate(zod(userCreationAccountSchema));

	return {
		form
	};
};
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const providentForm = await superValidate(formData, zod(userCreationAccountSchema));
		throw await RepositoryError.fromHttpResponse(new Response(), `Impossible d'enregistrer le contrat.`);

		return providentForm;
	}
};
