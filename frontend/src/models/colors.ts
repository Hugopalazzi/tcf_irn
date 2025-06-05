export const ColorsEnum = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
    GREEN: 'green',
    ERROR: 'error'
} as const;

export type ColorsType = (typeof ColorsEnum)[keyof typeof ColorsEnum];
