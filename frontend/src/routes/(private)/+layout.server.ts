import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetUser } }) => {
	const { user } = await safeGetUser();
	if (!user) {
		redirect(303, '/login');
	}
	return {
		user
	};
};
