import type { HttpError } from '@sveltejs/kit';
import { dev } from '$app/environment';

export class RepositoryError implements HttpError {
	constructor(
		public readonly status: number,
		public readonly localReason: string,
		public readonly remoteReason: string
	) {}

	get message() {
		let message = `ERROR ${this.status}: ${this.localReason}`;
		if (dev) {
			message += ` (Remote response: ${this.remoteReason})`;
		}
		return message;
	}

	get body(): App.Error {
		return {
			message: this.localReason
		};
	}

	static async fromHttpResponse(response: Response, localReason: string) {
		let remoteReason = '';
		try {
			remoteReason = await response?.text();
		} catch (e) {
			console.log('Error reading response : ', response, e);
			// do nothing
		}

		return new RepositoryError(response.status, localReason, remoteReason);
	}
}
