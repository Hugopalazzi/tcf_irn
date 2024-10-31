import { z } from 'zod';

const emailErrorMessage = 'Veuillez saisir un e-mail valide.';
const emailSchema = z.string().email(emailErrorMessage);
export const requiredEmailSchema = emailSchema.min(1);

export const userAccountSchema = z.object({
    username: z.string().min(1),
    emailPro: requiredEmailSchema,
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
}).superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
});