import { z } from 'zod';

const emailErrorMessage = 'Veuillez saisir un e-mail valide.';
const emailSchema = z.string().email(emailErrorMessage);
export const requiredEmailSchema = emailSchema.min(1);

export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

export const userAccountSchema = z.object({
    username: z.string().min(1),
    email: requiredEmailSchema,
    password: z
        .string()
        .min(8,'The password must contain at least 8 characters')
        .regex(passwordRegex, 'The password must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character.'),
    passwordConfirmation: z.string().min(1, 'Field must not be empty'),
}).superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "The passwords did not match",
        });
    }
});