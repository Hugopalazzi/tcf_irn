import type { SupabaseClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { examsEnum, type ExamsType } from '@tcf/models/exams.js';
import { questionTypeEnum, type QuestionType } from '@tcf/models/question';

export const load = async ({ locals: { supabase }, parent, url }) => {
	const { user } = await parent();
	const userId = user.id;
	const examType = url.searchParams.get('type');

	switch (examType) {
		case examsEnum.LISTENING_EXAM:
			await createAndRedirectExam(examType, userId, questionTypeEnum.SINGLE_CHOICE_WITH_AUDIO, supabase);
		case examsEnum.READING_EXAM:
			await createAndRedirectExam(examType, userId, questionTypeEnum.SINGLE_CHOICE, supabase);
		case examsEnum.WRITING_EXAM:
			await createAndRedirectExam(examType, userId, questionTypeEnum.WRITTEN_RESPONSE, supabase);
		default:
			redirect(303, '/dashboard');
	}
};

const createAndRedirectExam = async (type: ExamsType, userId: string, questionType: QuestionType, supabase: SupabaseClient<any, 'public', any>) => {
	const { data: examId, error: createExamError } = await supabase.rpc('create_user_exam', {
		user_id: userId,
		question_count: 20,
		p_question_type: questionType
	});

	if (!createExamError) {
		redirect(303, `/exams/${type}/${examId}`);
	} else {
		console.error('Error creating exam: ', createExamError);
		error(404, createExamError?.details);
	}
};
