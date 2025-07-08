import { generateExamsHistory } from "@tcf/lib/mappers/examsHistoryMapper";

export const load = async ({ locals: { supabase } }) => {
    const { data: userExamsHistoryData, error: fetchError } = await supabase.from('user_exams').select();
    if (fetchError) {
        throw new Error('Failed to fetch exam history: ' + fetchError.message);
    }
    const userExamsHistory = generateExamsHistory(userExamsHistoryData);

    return { userExamsHistory };
};
