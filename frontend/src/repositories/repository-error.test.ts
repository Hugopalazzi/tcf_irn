import { describe, expect, it } from 'vitest';
import { RepositoryError } from './repository-error';

describe('repository helper', () => {
	const error = new RepositoryError(
		500,
		'Erreur serveur',
		"Message erreur renvoyé par l'api"
	);

	describe('#get message dev env', () => {
		it('should return the error message', () => {
			expect(error.message).toStrictEqual(
				`ERROR 500: Erreur serveur (Remote response: Message erreur renvoyé par l'api)`
			);
		});
	});

	describe('#get body dev env', () => {
		const expected = {
			message: 'Erreur serveur'
		};

		it('should return the error message', () => {
			expect(error.body).toStrictEqual(expected);
		});
	});
});
