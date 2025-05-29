export async function checkPremiumAccess(supabase: any, fetch: typeof globalThis.fetch) {
	const {
		data: { session }
	} = await supabase.auth.getSession();

	// Check if session exists
	if (!session || !session.access_token) {
		console.error('No valid session found');
		return false; // or handle as needed
	}

	const token = session.access_token;

	try {
		const res = await fetch('/api/user-status', {
			headers: { Authorization: `Bearer ${token}` }
		});

		// Check if the response is successful
		if (!res.ok) {
			return false;
		}

		const { hasPaid } = await res.json();
		return hasPaid;
	} catch (error) {
		console.error('Error in checkPremiumAccess:', error);
		return false; // or handle as needed
	}
}
