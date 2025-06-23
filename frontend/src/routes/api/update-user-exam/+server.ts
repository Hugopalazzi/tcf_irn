import { json, type RequestHandler } from '@sveltejs/kit';
import { errorLogger } from '@tcf/lib/helpers/errorHelper';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
    try {
        // Ensure request has a body before parsing
        if (!request.body) {
            throw new Error('Request body is empty');
        }

        let requestData: { currentQuestionIndex: number, userExamId: string, questionId: string, isCorrectAnswer: boolean, answer: string };
        try {
            requestData = await request.json();
        } catch {
            throw new Error('Invalid JSON payload');
        }

        const { currentQuestionIndex, userExamId, isCorrectAnswer, answer, questionId } = requestData;
        if (!currentQuestionIndex || !userExamId || !questionId) {
            throw new Error('Missing required field: currentQuestionIndex, userExamId or questionId');
        }

        const updates: Record<string, any> = {
            current_question_index: currentQuestionIndex
        };

        if (isCorrectAnswer) {
            const { data: examData, error: fetchError } = await supabase
                .from('user_exams')
                .select('score')
                .eq('id', userExamId)
                .single();

            if (fetchError) {
                throw new Error('Failed to fetch current score: ' + fetchError.message);
            }

            const newScore = (examData?.score || 0) + 1;
            updates.score = newScore;
        }

        const { error: updateError } = await supabase
            .from('user_exams')
            .update(updates)
            .eq('id', userExamId);

        if (updateError) {
            throw new Error('Error updating user_exams: ' + updateError.message);
        }

        const userExamAnswersData = await supabase
            .from('user_exam_answers')
            .insert({ user_exam_question_id: questionId, answer_text: answer, is_correct: isCorrectAnswer });

        if (userExamAnswersData.error) {
            throw new Error('An error occured inserting user_exam_answers: ' + userExamAnswersData.error.message);
        }

        return json({ status: 'success', message: 'User exam updated successfully' }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        errorLogger(400, `Error handling create subscription session: ${errorMessage}`);
        return json({ error: errorMessage }, { status: 400 });
    }
};
