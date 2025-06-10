export const examsEnum = {
	LISTENING_EXAM: 'listening-exam',
	READING_EXAM: 'reading-exam',
	WRITING_EXAM: 'writing-exam'
} as const;

export const statusCodeEnum = {
	PENDING: 'pending',
	COMPLETED: 'completed'
} as const;

export type ExamsType = (typeof examsEnum)[keyof typeof examsEnum];

export const examLevelEnum = {
	EASY: 'easy',
	INTERMEDIATE: 'intermediate',
	ADVANCED: 'advanced'
} as const;
export type ExamLevelType = (typeof examLevelEnum)[keyof typeof examLevelEnum];

export const examStarNumber: Record<ExamLevelType, number> = {
	easy: 1,
	intermediate: 2,
	advanced: 3
};

export type Exam = { uuid: string; title: string; difficulty: ExamLevelType; created_at: Date; updated_at?: Date };
