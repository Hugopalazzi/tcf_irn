import { UserExamService } from '@tcf/services/api/userExam.service';

export function createUserExamStepper({
	userExamId,
	questionsData
}: {
	userExamId: string;
	questionsData: any[];
}) {
	const userExamService = new UserExamService();

	return function getNextQuestionIndex(currentIndex: number, currentAnswer: string): number {
		const isLastQuestion = currentIndex >= questionsData.length - 1;

		if (currentIndex > questionsData.length - 1) return currentIndex;

		const calculatedIndex = isLastQuestion ? currentIndex : currentIndex + 1;

		const questionRow = questionsData[currentIndex];
		const correctAnswer = questionRow.correct_answer;
		const questionId = questionRow.id;
		const isCorrect = currentAnswer === correctAnswer;
		userExamService.updateUserExam(calculatedIndex, userExamId, questionId, currentAnswer, isCorrect);

		return calculatedIndex;
	};
}
