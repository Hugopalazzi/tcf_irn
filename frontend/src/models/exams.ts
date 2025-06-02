export const examsEnum = {
	LISTENING_EXAM: 'listeningExam',
	READING_EXAM: 'readingExam',
    WRITING_EXAM: 'writingExam',
} as const;

export type ExamsType = (typeof examsEnum)[keyof typeof examsEnum];