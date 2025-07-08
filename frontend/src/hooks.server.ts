import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { paraglideMiddleware } from '$lib/paraglide/server';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

const supabase: Handle = async ({ event, resolve }) => {
	/**
	 * Creates a Supabase client specific to this server request.
	 *
	 * The Supabase client gets the Auth token from the request cookies.
	 */
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			/**
			 * SvelteKit's cookies API requires `path` to be explicitly set in
			 * the cookie options. Setting `path` to `/` replicates previous/
			 * standard behavior.
			 */
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});

	/**
	 * This function calls `getUser()` to validate the JWT before returning the user.
	 */
	event.locals.safeGetUser = async () => {
		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			// JWT validation has failed
			return { user: null };
		}
		return { user };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			/**
			 * Supabase libraries use the `content-range` and `x-supabase-api-version`
			 * headers, so we need to tell SvelteKit to pass it through.
			 */
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};

const authGuard: Handle = async ({ event, resolve }) => {
	const { user } = await event.locals.safeGetUser();
	event.locals.user = user;
	const url = event.url.pathname;

	const allowedPublicRoutes = [
		'/auth/login/google',
		'/auth/callback',
		'/registration',
		'/login',
		'/',
		'/confirmation-email',
		'/mot-de-passe-oublie',
		'/modifier-mot-de-passe',
		'/api/create-subscription-session',
		'/api/create-stripe-customer',
		'/api/user-status',
		'/api/webhook'
	];
	const allowedPrivateRoutes = [
		'/dashboard',
		'/exams',
		'/exams/listening-exam/[id]',
		'/exam-proxy',
		'/logout',
		'/confirmation-email',
		'/modifier-mot-de-passe',
		'/payment',
		'/api/update-user-exam',
		'/api/submit-user-exam',
		'/api/create-subscription-session',
		'/api/create-stripe-customer',
		'/api/user-status',
		'/api/webhook'
	];

	if (!user && !allowedPublicRoutes.includes(url)) {
		redirect(303, '/');
	}
	const isDynamicRouteAllowed = allowedPrivateRoutes.some((prefix) => url.startsWith(prefix));

	if (user && !isDynamicRouteAllowed) {
		redirect(303, '/dashboard');
	}

	return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard, handleParaglide);
