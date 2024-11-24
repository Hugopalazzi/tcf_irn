
import { listeningComprehensionSchema } from '@tcf/models/forms/mcqSchema.js';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async ({ params }) => {
    const title = ` Module ${params.id}`

    const form = await superValidate(zod(listeningComprehensionSchema));
    return {
        form,
        title
    };
};