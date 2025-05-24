const gradientColorsEnum = {
	BLUE: 'blue-gradient',
	GREEN: 'green-gradient',
	RED: 'red-gradient'
} as const;

type GradientColorsType = (typeof gradientColorsEnum)[keyof typeof gradientColorsEnum];
