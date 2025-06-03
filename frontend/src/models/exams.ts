import { m } from '$lib/paraglide/messages.js';

export const examsEnum = {
	LISTENING_EXAM: 'listeningExam',
	READING_EXAM: 'readingExam',
	WRITING_EXAM: 'writingExam'
} as const;

export type ExamsType = (typeof examsEnum)[keyof typeof examsEnum];

export const examComplexityEnum = {
	EASY: 'easy',
	INTERMEDIATE: 'intermediate',
	ADVANCED: 'advanced',
	HARD: 'hard',
	EXPERT: 'expert'
} as const;
export type ExamComplexityType = (typeof examComplexityEnum)[keyof typeof examComplexityEnum];

export const examComplexityLabels: Record<ExamComplexityType, string> = {
	easy: m['experience.easy'](),
	intermediate: m['experience.intermediate'](),
	advanced: m['experience.advanced'](),
	hard: m['experience.hard'](),
	expert: m['experience.expert']()
};

export const examStarNumber: Record<ExamComplexityType, number> = {
	easy: 1,
	intermediate: 2,
	advanced: 3,
	hard: 4,
	expert: 5
};

export type Exam = { uuid: string; title: string; difficulty: ExamComplexityType };
