import { json, type RequestHandler } from '@sveltejs/kit';
import { errorLogger } from '@tcf/lib/helpers/errorHelper';

export const POST: RequestHandler = async ({ request, locals: { supabase, user } }) => {
	try {
		let requestData: { userExamId: string };
		try {
			requestData = await request.json();
		} catch {
			throw new Error('Invalid JSON payload');
		}

		const { userExamId } = requestData;
		if (!userExamId) {
			throw new Error('Missing required field: userExamId');
		}

		const { data: examData } = await supabase.from('user_exams').select('score').eq('id', userExamId).single();

		await supabase.rpc('add_experience', {
			uid: user!.id,
			xp_to_add: examData?.score ? examData.score * 10 : 0
		});

		await supabase.from('user_exams').update({ status: 'finished' }).eq('id', userExamId);

		return json(examData);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		errorLogger(400, `Error handling submit exam session: ${errorMessage}`);
		return json({ error: errorMessage }, { status: 400 });
	}
};
