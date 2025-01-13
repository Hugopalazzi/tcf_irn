import { readable } from 'svelte/store';
import { browser } from '$app/environment';
import { afterNavigate, beforeNavigate, goto } from '$app/navigation';

/**
 * Handle history management because window.history can get out of this app scope.
 *
 */
export class HistoryManager {
    private urlHistory: string[] = [];
    private preventNextPush = false;
    private state?: number;

    public init() {
        if (browser) {
            beforeNavigate(async () => {
                this.state = history.state['sveltekit:history'];
            });
            afterNavigate(async ({ from }) => {
                this.pushHistory(from?.url?.toString(), history.state['sveltekit:history']);
            });
        }
    }

    public async back(fallbackUrl: string = '..') {
        const previousUrl = this.getPreviousUrl() ?? fallbackUrl;
        this.popHistory();
        await goto(previousUrl);
    }

    private getPreviousUrl() {
        return this.urlHistory?.[this.urlHistory.length - 1];
    }

    private popHistory() {
        this.preventNextPush = true; // Prevent redirect from create entry for previous page
        this.urlHistory.pop();
    }

    private pushHistory(value: string | undefined, nextState: number) {
        // when state != nextState, it means that routing was called with replacestate = false (i.e in employee detail tabs)
        if (value && !this.preventNextPush && this.state !== nextState) {
            this.urlHistory.push(value);
            if (this.urlHistory.length >= 20) {
                this.urlHistory.slice(-20);
            }
        }
        this.preventNextPush = false;
        this.state = nextState;
    }
}

export const historyManager = readable<HistoryManager>(new HistoryManager());
