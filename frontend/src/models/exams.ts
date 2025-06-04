import { m } from '$lib/paraglide/messages.js';

export const examsEnum = {
	LISTENING_EXAM: 'listeningExam',
	READING_EXAM: 'readingExam',
	WRITING_EXAM: 'writingExam'
} as const;

export type ExamsType = (typeof examsEnum)[keyof typeof examsEnum];

export const examLevelEnum = {
	EASY: 'easy',
	INTERMEDIATE: 'intermediate',
	ADVANCED: 'advanced',
	HARD: 'hard',
	EXPERT: 'expert'
} as const;
export type ExamLevelType = (typeof examLevelEnum)[keyof typeof examLevelEnum];

export const examStarNumber: Record<ExamLevelType, number> = {
	easy: 1,
	intermediate: 2,
	advanced: 3,
	hard: 4,
	expert: 5
};

export type Exam = { uuid: string; title: string; difficulty: ExamLevelType };
