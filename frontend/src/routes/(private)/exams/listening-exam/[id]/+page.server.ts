import { error } from '@sveltejs/kit';

export const load = async ({ locals: { supabase }, params: { id } }) => {
	const { data, error: userExamError } = await supabase
		.from('user_exam_questions')
		.select('position, question:questions(title, choices, audio_url, question_type)')
		.eq('user_exam_id', id)
		.order('position');

	if (data && !userExamError) {
		return { questions: data };
	} else {
		console.error(`Error fetching exam with id ${id}: `, userExamError);
		error(500, userExamError?.details);
	}
};
