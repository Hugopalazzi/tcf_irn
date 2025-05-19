import type { SuperValidated } from 'sveltekit-superforms';
import { z } from 'zod';
import { _ } from 'svelte-i18n';
import { get } from 'svelte/store';

const emailErrorMessage = get(_)('form.email.error');
export const emailSchema = z.string().email(emailErrorMessage);

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
export const userCreationAccountSchema = z
	.object({
		username: z.string().min(1),
		email: emailSchema,
		password: z.string().min(8, get(_)('form.password.minError')).regex(passwordRegex, get(_)('form.password.regexError')),
		passwordConfirmation: z.string().min(1, get(_)('form.passwordConfirmation.error')),
		agreeTerms: z.boolean().default(false)
	})
	.superRefine(({ passwordConfirmation, password }, ctx) => {
		if (passwordConfirmation !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: get(_)('differentError')
			});
		}
	});
export type UserSignUpForm = SuperValidated<z.infer<typeof userCreationAccountSchema>>;

export const userLoginSchema = z.object({
	email: emailSchema,
	password: z.string().min(1, 'Field must not be empty')
});
export type UserLoginForm = SuperValidated<z.infer<typeof userLoginSchema>>;

export const userForgotPasswordSchema = z.object({
	email: emailSchema
});

export const userResetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, 'The password must contain at least 8 characters')
			.regex(passwordRegex, 'The password must contain 1 uppercase, 1 lowercase, 1 number.'),
		passwordConfirmation: z.string().min(1, 'Field must not be empty')
	})
	.superRefine(({ passwordConfirmation, password }, ctx) => {
		if (passwordConfirmation !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'The passwords did not match'
			});
		}
	});

export type UserModifyPasswordForm = SuperValidated<z.infer<typeof userResetPasswordSchema>>;
