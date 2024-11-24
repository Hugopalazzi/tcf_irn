
import { listeningComprehensionSchema } from '@tcf/models/forms/mcqSchema.js';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async ({ params }) => {
    const title = ` Module ${params.id}`

    const form = await superValidate(zod(listeningComprehensionSchema));

    const exam: {
        audio: string,
        question: string,
        responses: string[]
    }[] = [{
        audio: "/src/static/audio/test",
        question: "Quel est la couleur du cheval ?",
        responses: ["chat", "chien", "cheval", "canard"]
    },
    {
        audio: "/src/static/audio/test",
        question: "Comment tu t'appel ?",
        responses: ["Jean", "Malouche", "Cor", "Hugo"]
    }]
    return {
        form,
        title,
        exam
    };
};