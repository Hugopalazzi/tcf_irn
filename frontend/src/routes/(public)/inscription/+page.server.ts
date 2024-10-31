import { userAccountSchema } from '@tcf/models/forms/userSchema';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async () => {
    const form = await superValidate(zod(userAccountSchema));

    return {
        form
    };
};

// export const actions = {
//     default: async ({ request, locals }) => {
//         const requestFormData = await request.formData();
//         const superForm = await superValidate(requestFormData, zod(contactSchema));

//         const { contactRepository } = locals.pmServices;

//         const superFormData = superForm.data;
//         const formData = new FormData();
//         const contactForm: PmContactRequest = {
//             idPersonneMorale: superFormData.idPersonneMorale,
//             codeObjetDemande: superFormData.codeObjetDemande,
//             message: superFormData.message
//         };

//         if (superFormData.resiliation) {
//             contactForm.resiliation = superFormData.resiliation;
//         }

//         formData.append('contactForm', JSON.stringify(contactForm));

//         requestFormData.getAll('fichiers').forEach((file) => formData.append('fichiers', file));

//         await contactRepository.importGed(formData);
//     }
// };
