const focusableSelectors = [
	'a[href]',
	'area[href]',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'button:not([disabled])',
	'iframe',
	'object',
	'embed',
	'[contenteditable]',
	'[tabindex]:not([tabindex="-1"])'
].join(',');

export const focusTrap = (event: KeyboardEvent, dialog: HTMLDialogElement) => {
	if (event.key !== 'Tab' || !dialog) return;

	const focusableElements = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelectors)).filter((el) => el.offsetParent !== null);

	const firstElement = focusableElements[0];
	const lastElement = focusableElements[focusableElements.length - 1];

	if (!firstElement || !lastElement) return;

	if (event.shiftKey) {
		if (document.activeElement === firstElement) {
			event.preventDefault();
			lastElement.focus();
		}
	} else {
		if (document.activeElement === lastElement) {
			event.preventDefault();
			firstElement.focus();
		}
	}
};
