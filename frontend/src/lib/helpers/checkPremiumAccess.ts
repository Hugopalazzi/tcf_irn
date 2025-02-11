export async function checkPremiumAccess(supabase: any, fetch: typeof globalThis.fetch) {
	const token = await (await supabase.auth.getSession()).data.session.access_token;

	const res = await fetch('/api/user-status', {
		headers: { Authorization: `Bearer ${token}` }
	});

	const { hasPaid } = await res.json();
	return hasPaid;
}
