import type { Tables } from '@tcf/models/database.model';
import type { Exam } from '@tcf/lib/components/Organisms/ExamsTable.svelte';
import { formatDate } from '@tcf/lib/helpers/utils';

export const buildExamsHistory = (examsHistory : Tables<'user_exams'>[]): Exam[] => {
    return examsHistory.map(exam => {
        const {id, status, current_question_index, question_count, score, updated_at, created_at, type } = exam;
        const progress = Math.floor(((current_question_index + 1) / question_count) * 100);
        return {
		id: id,
		type: type,
		date: formatDate(updated_at || created_at),
		score: `${score}/${question_count}`,
		statusCode: status,
		progress: progress
    }

    })

}