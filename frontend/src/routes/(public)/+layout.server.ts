import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
    const session = await locals.auth();

    if (session) {
        redirect(301, '/tableau-de-bord')
    }

    return { session };
}