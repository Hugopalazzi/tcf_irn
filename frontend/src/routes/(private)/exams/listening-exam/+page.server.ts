import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { questionTypeEnum } from '@tcf/models/question';

export const load = async ({ locals: { supabase }, parent }) => {
	const { user } = await parent();

	const { data: examId, error: createExamError } = await supabase.rpc('create_user_exam', {
		user_id: user.id,
		question_count: 20,
		p_question_type: questionTypeEnum.SINGLE_CHOICE_WITH_AUDIO
	});

	if (!createExamError) {
		redirect(303, `/exams/listening-exam/${examId}`);
	} else {
		console.error('Error creating exam: ', createExamError);
		error(500, createExamError?.details);
	}
};
