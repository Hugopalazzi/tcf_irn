export const load = async ({ locals }) => {
    const session = await locals.auth();

    console.log("session", session)

    return { session };
}