export class UserExamService {
    private baseUrl: string = '';
    constructor() {
        this.baseUrl = "/api"
    }

    public updateUserExam = async (currentQuestionIndex: number, userExamId: string, questionId: string, answer: string, isCorrectAnswer: boolean) => {
        fetch(`${this.baseUrl}/update-user-exam`, {
            method: 'POST',
            body: JSON.stringify({
                currentQuestionIndex,
                userExamId,
                isCorrectAnswer,
                answer: answer || '',
                questionId
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error(`Error while updating user exam : ${error.toString()}`);
            });
    };

}
