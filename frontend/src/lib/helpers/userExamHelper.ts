import type { SupabaseClient } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';

export const getUserExamById = async (supabase: SupabaseClient<any, 'public', any>, id: string) => {
	const { data, error: userExamError } = await supabase
		.from('user_exam_questions')
		.select('position, question:questions(title, choices, audio_url, question_type, correct_answer), user_exam:user_exam_id(question_count)')
		.eq('user_exam_id', id)
		.order('position');

	if (data && !userExamError) {
		return { questions: data };
	} else {
		console.error(`Error fetching exam with id ${id}: `, userExamError);
		error(500, userExamError?.details);
	}
};
