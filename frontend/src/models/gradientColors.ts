export const gradientColorsEnum = {
	BLUE: 'blue-gradient',
	GREEN: 'green-gradient'
} as const;

export type GradientColorsType =
	(typeof gradientColorsEnum)[keyof typeof gradientColorsEnum];
