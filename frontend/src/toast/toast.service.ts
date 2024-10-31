import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const DEFAULT_EXPIRATION_TIME_MS = 15_000;
export type NotifyType = 'info' | 'success' | 'warning' | 'error';
export type Toast = {
    id: number;
    type: NotifyType;
    message: string;
    link?: string;
    linkMessage?: string;
    closable: boolean;
    expiration: number;
};

let messageCounter = 0;
export const toasts = writable<Toast[]>([]);

/**
 * Add a simple toast
 * @param options toast details
 */
export function addToast(options: {
    type: NotifyType;
    message: string;
    link?: string;
    linkMessage?: string;
    closable?: boolean;
    expiration?: number;
}) {
if (browser) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    toasts.update((existings) => [
        ...existings,
        {
            id: messageCounter++,
            type: options.type,
            message: options.message,
            link: options.link,
            linkMessage: options.linkMessage,
            closable: !!options.closable,
            expiration: options.expiration ? Date.now() + options.expiration : 9999999999999,
        },
    ]);
}

export function addErrorToast(message = 'Une erreur interne est survenue. Veuillez réessayer ultérieurement.', expiration = DEFAULT_EXPIRATION_TIME_MS) {
    addToast({
        type: 'error',
        message: message,
        closable: true,
        expiration,
    });
}

export function addSuccessToast(message = 'Requête exécutée avec succès', expiration = DEFAULT_EXPIRATION_TIME_MS) {
    addToast({
        type: 'success',
        message: message,
        closable: true,
        expiration,
    });
}

/**
 * Remove a toast
 * @param id
 */
export function removeToast(id: Toast['id']) {
    toasts.update((existings) => existings.filter((message) => message.id !== id));
}

/**
 * Remove every toasts
 */
export function removeAllToasts() {
    toasts.set([]);
}

/**
 * Remove every expired toasts
 */
export function removeExpiredToasts() {
    toasts.update((existings) => existings.filter((message) => message.expiration > Date.now()));
}
