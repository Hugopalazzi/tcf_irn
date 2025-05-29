import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetUser }, cookies }) => {
	const { user } = await safeGetUser();
	return {
		user,
		cookies: cookies.getAll()
	};
};
