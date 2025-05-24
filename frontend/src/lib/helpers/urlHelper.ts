export const getParamValue = (searchParams: URLSearchParams, paramName: string, defaultValue = '') => {
	return searchParams.get(paramName) ?? defaultValue;
};
