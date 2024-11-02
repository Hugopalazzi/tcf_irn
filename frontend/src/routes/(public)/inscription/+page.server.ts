import { userAccountSchema } from '@tcf/models/forms/userSchema';
import { RepositoryError } from '@tcf/repositories/repository-error.js';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async () => {
    const form = await superValidate(zod(userAccountSchema));

    return {
        form
    };
};
export const actions = {
    default: async ({ request }) => {
        console.log('actionnn');
        const formData = await request.formData();
        const providentForm = await superValidate(formData, zod(userAccountSchema));
        throw await RepositoryError.fromHttpResponse(new Response, `Impossible d'enregistrer le contrat.`);

        return providentForm
    }
}