import { z } from 'zod';

const emailErrorMessage = 'Veuillez saisir un e-mail valide.';
const emailSchema = z.string().email(emailErrorMessage);
export const requiredEmailSchema = emailSchema.min(1);

export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

export const userAccountSchema = z.object({
    username: z.string().min(1),
    emailPro: requiredEmailSchema,
    password: z
        .string()
        .min(8)
        .regex(passwordRegex, 'The password must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character.'),
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