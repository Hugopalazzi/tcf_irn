import { UserExamService } from '@tcf/services/api/userExam.service';

export function createUserExamStepper({
	userExamId,
	questions
}: {
	userExamId: string;
	questions: any[];
}) {
	const userExamService = new UserExamService();

	return function getNextQuestionIndex(currentIndex: number, currentAnswer: string): number {
		if (currentIndex >= questions.length - 1) return currentIndex;

		const nextIndex = currentIndex + 1;

		const questionRow = questions[currentIndex];
		const correctAnswer = questionRow.question.correct_answer;
		const questionId = questionRow.id;
		const isCorrect = currentAnswer === correctAnswer;

		userExamService.updateUserExam(nextIndex, userExamId, questionId, currentAnswer, isCorrect);

		return nextIndex;
	};
}
