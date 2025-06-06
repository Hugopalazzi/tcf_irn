import type { Session, SupabaseClient, User } from '@supabase/supabase-js';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			safeGetUser: () => Promise<{ user: User | null }>;
			user: User | null;
		}

		// interface PageState {}
		// interface Platform {}
	}
}

export {};
