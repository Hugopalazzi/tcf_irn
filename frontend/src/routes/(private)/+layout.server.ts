import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetUser } }) => {
	const { user } = await safeGetUser();
	return {
		user
	};
};
