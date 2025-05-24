export const superFormDefaultConfig = {
	resetForm: false,
	taintedMessage: null,
	applyAction: true,
	validationMethod: 'oninput',
	dataType: 'json',
	scrollToError: 'smooth'
} as const;

// Zod.Enum makes any field mandatory. But sometimes we want our field to have another default invalid value (for selected default value purpose)
export const zodEmptyEnumValue = undefined as any;
