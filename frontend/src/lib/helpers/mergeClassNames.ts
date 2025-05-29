export const mergeClassNames = (base: string, extra?: string) => {
	return extra ? `${base} ${extra}` : base;
};
