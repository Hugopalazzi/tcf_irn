import { json, type RequestHandler } from '@sveltejs/kit';
import { errorLogger } from '@tcf/lib/helpers/errorHelper';

export const POST: RequestHandler = async ({ request, locals : {supabase} }) => {
    try {
        // Ensure request has a body before parsing
        if (!request.body) {
            throw new Error('Request body is empty');
        }

        let requestData: { currentQuestionIndex?: number, userExamId?: string };
        try {
            requestData = await request.json();
        } catch {
            throw new Error('Invalid JSON payload');
        }

        const { currentQuestionIndex, userExamId } = requestData;
        if (!currentQuestionIndex || !userExamId) {
            throw new Error('Missing required field: currentQuestionIndex or userExamId');
        }

        const { error } = await supabase
            .from('user_exams')
            .update({ current_question_index: currentQuestionIndex })
            .eq('id', userExamId);

        if (error) {
            throw new Error('An error occured updating user exam: ' + error.message);
        }

        return json({ status: 'success', message: 'User exam updated successfully' }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        errorLogger(400, `Error handling create subscription session: ${errorMessage}`);
        return json({ error: errorMessage }, { status: 400 });
    }
};
