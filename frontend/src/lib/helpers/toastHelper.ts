import toast, { type ToastPosition } from 'svelte-french-toast';

export const addSuccessToast = (
	message: string,
	position: ToastPosition = 'top-right'
): void => {
	toast.success(message, {
		position
	});
};

export const addErrorToast = (message?: string): void => {
	toast.error(
		message ??
			'Une erreur est survenue. Veuillez contacter votre administrateur',
		{
			position: 'top-right'
		}
	);
};
