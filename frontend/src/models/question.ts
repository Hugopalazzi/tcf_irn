import type { ExamLevelType } from '@tcf/models/exams';

export const questionTypeEnum = {
	SINGLE_CHOICE_WITH_AUDIO: 'single_choice_with_audio',
	SINGLE_CHOICE: 'single_choice',
	WRITTEN_RESPONSE: 'written_response'
} as const;
export type QuestionType = (typeof questionTypeEnum)[keyof typeof questionTypeEnum];

export type Question = {
	id: string;
	title: string;
	choices: string[];
	difficulty: ExamLevelType;
	question_type: QuestionType;
	correct_answer: string;
	created_at: Date;
	updated_at?: Date;
	audio_url?: string;
	question_text?: string;
};

