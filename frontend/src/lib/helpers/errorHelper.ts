export const errorLogger = (status: number, message: string) => {
	const error = new Error();
	const stackLines = error.stack ? error.stack.split('\n') : [];
	const source =
		stackLines.length > 2 ? stackLines[2].trim() : 'Unknown source';

	console.error(JSON.stringify({ status, message, source }));
};
