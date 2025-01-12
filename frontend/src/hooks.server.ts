import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { buildAuthentification } from "@tcf/sso.server";

const handleRouteAccess: Handle = async ({ event, resolve }) => {
    if (event.route.id === 'login' || event.route.id === 'inscription') {
        resolve(event)
    }
    // const session = await event.locals?.auth();

    return resolve(event)
}


export const handle: Handle = sequence(handleRouteAccess, buildAuthentification)