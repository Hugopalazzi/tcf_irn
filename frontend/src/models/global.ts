export const statusEnum = {
    SUCCESS: 'success',
    ERROR: 'error',
    SELECTED: 'selected',
    NONE: 'none',
    UNCLICKABLE : 'unclickable'
} as const;

export type StatusType = (typeof statusEnum)[keyof typeof statusEnum];