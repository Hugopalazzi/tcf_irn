import toast from 'svelte-french-toast';

export const addSuccessToast = (message: string): void => {
	toast.success(message, {
		position: 'top-right'
	});
};

export const addErrorToast = (message?: string): void => {
	toast.error(message ?? 'Une erreur est survenue. Veuillez contacter votre administrateur', {
		position: 'top-right',
	});
};
