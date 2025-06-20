import type { SupabaseClient } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';
import type { Database } from '@tcf/models/database.model';

export const getUserExamById = async (supabase: SupabaseClient<Database>, id: string): Promise<{ questions: any[], currentQuestionIndex: number, userExamId: string }> => {
	const { data, error: userExamError } = await supabase
		.from('user_exam_questions')
		.select(`
		position,
		question:questions(title, choices, audio_url, question_type, correct_answer),
		user_exam:user_exam_id(current_question_index, question_count)
	`)
		.eq('user_exam_id', id)
		.order('position');

	let questions = [];
	let currentQuestionIndex = 0;

	const { data: { session } } = await supabase.auth.getSession();

	if (data && !userExamError) {
		questions = data;
		currentQuestionIndex = data[0]?.user_exam?.current_question_index || 0;
	} else {
		console.error(`Error fetching exam with id ${id}: `, userExamError);
		error(500, userExamError?.details);
	}

	return {
		questions,
		currentQuestionIndex,
		userExamId: id
	}
};
