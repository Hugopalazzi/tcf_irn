import { dev } from '$app/environment';

export function Benchmark(suffix = 'noprefix') {
	return function (
		_: unknown,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		if (!dev) return;
		const method = descriptor.value;
		const start = () => console.time(`${suffix}.${propertyKey}`);
		const stop = () => console.timeEnd(`${suffix}.${propertyKey}`);
		descriptor.value = function (
			...args: unknown[]
		): Promise<unknown> | unknown {
			const action = method.apply.bind(method, this, args);
			start();
			const result: unknown = action();
			if (result instanceof Promise) {
				return result.finally(() => stop());
			} else {
				stop();
				return result;
			}
		};
	};
}
