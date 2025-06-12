import { m } from "$lib//paraglide/messages.js";

const mAny = m as unknown as Record<string, (inputs?: Record<string, any>) => string>;

export function t(key: string, inputs?: Record<string, any>) {
	return mAny[key]?.(inputs) || key;
}