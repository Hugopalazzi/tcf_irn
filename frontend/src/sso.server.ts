import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import Google from "@auth/core/providers/google";
import { SvelteKitAuth } from "@auth/sveltekit";
import type { Handle } from "@sveltejs/kit";

export const buildAuthentification: Handle = (event) => {
    const auth = SvelteKitAuth({
        providers: [Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })],
 
    });

    return auth.handle(event);
}
