// import { redirect } from "@sveltejs/kit";

// export const load = async ({ locals }) => {
//     const session = await locals.auth();

//     if (session) {
//        redirect(302, '/dashboard');
//     }

//     return { session };
// }

import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  const { session } = await safeGetSession()
  return {
    session,
    cookies: cookies.getAll(),
  }
}