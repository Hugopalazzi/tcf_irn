import type { SupabaseClient } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';
import type { Database } from '@tcf/models/database.model';

export const getUserExamById = async (supabase: SupabaseClient<Database>, id: string): Promise<string> => {
	const { data, error: userExamError } = await supabase.from('user_exams').select(`status`).eq('id', id).single();

	if (data && !userExamError) {
		return data.status;
	} else {
		console.error(`Error fetching exam with id ${id}: `, userExamError);
		error(500, userExamError?.details);
	}
};

export const getUserExamQuestionByExamId = async (
	supabase: SupabaseClient<Database>,
	id: string
): Promise<{ questionsData: any[]; currentQuestionIndex: number; userExamId: string }> => {
	const { data, error: userExamError } = await supabase
		.from('user_exam_questions')
		.select(
			`id, question:questions(title, choices, audio_url, question_type, correct_answer), user_exam:user_exam_id(current_question_index, question_count)`
		)
		.eq('user_exam_id', id)
		.order('position');

	let questionsData = [];
	let currentQuestionIndex = 0;

	if (data && !userExamError) {
		questionsData = data.map(({ id, question }) => {
			return {
				id,
				...question
			};
		});
		currentQuestionIndex = data[0]?.user_exam?.current_question_index || 0;
	} else {
		console.error(`Error fetching exam with id ${id}: `, userExamError);
		error(500, userExamError?.details);
	}

	return {
		questionsData,
		currentQuestionIndex,
		userExamId: id
	};
};
