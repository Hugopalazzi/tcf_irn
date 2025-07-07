import { redirect } from '@sveltejs/kit';
import { getUserExamById, getUserExamQuestionByExamId } from '@tcf/lib/helpers/userExamHelper.js';

export const load = async ({ locals: { supabase }, params: { id } }) => {
	const userExamStatus = await getUserExamById(supabase, id);

	if (userExamStatus !== 'in_progress') {
		redirect(303, '/dashboard');
	}
	
	return getUserExamQuestionByExamId(supabase, id);
};
