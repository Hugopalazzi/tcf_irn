import { getUserExamById } from '@tcf/lib/helpers/userExamHelper.js';

export const load = async ({ locals: { supabase }, params: { id } }) => {
	return getUserExamById(supabase, id);
};
