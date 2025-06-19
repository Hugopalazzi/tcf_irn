import { json, type RequestHandler } from '@sveltejs/kit';
import { stripeClient } from '@tcf/lib/configs/stripe.config';
import { getSupabaseClient } from '@tcf/lib/configs/supabase.config';
import { errorLogger } from '@tcf/lib/helpers/errorHelper';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return json({ error: 'No token provided' }, { status: 401 });
        }

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

        const supabaseClient = getSupabaseClient(token);
        const { error } = await supabaseClient
            .from('user_exams')
            .update({ current_question_index: currentQuestionIndex }) // 👈 pass an object here
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
