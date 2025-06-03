import { examComplexityEnum, type Exam, type ExamComplexityType } from '@tcf/models/exams';

export const load = async () => {
	const mockListeningExams: Record<ExamComplexityType, Exam[]> = {
		easy: [
			{ uuid: '1341f365-896a-42bc-91f6-fbc621be2259', title: 'Entrainement', difficulty: examComplexityEnum.EASY },
			{ uuid: 'ee349634-e817-47ec-8a74-53a7280e0c96', title: 'Tester votre niveau', difficulty: examComplexityEnum.EASY },
			{ uuid: 'e5455f5a-792f-4e44-ade9-bbac3d9c6def', title: 'Chien', difficulty: examComplexityEnum.EASY },
			{ uuid: '5b2f0ba8-1164-4315-938a-b2e6cd4cbfbd', title: 'Maison', difficulty: examComplexityEnum.EASY }
		],
		intermediate: [
			{ uuid: '4bf4cf51-4c47-4e88-a1d6-3bfdb180e6ad', title: 'Facile', difficulty: examComplexityEnum.INTERMEDIATE },
			{ uuid: 'cef401d7-7eb3-493b-80a7-a18e36988603', title: 'Rue', difficulty: examComplexityEnum.INTERMEDIATE },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examComplexityEnum.INTERMEDIATE },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examComplexityEnum.INTERMEDIATE }
		],
		advanced: [
			{ uuid: '4bf4cf51-4c47-4e88-a1d6-3bfdb180e6ad', title: 'Facile', difficulty: examComplexityEnum.ADVANCED },
			{ uuid: 'cef401d7-7eb3-493b-80a7-a18e36988603', title: 'Rue', difficulty: examComplexityEnum.ADVANCED },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examComplexityEnum.ADVANCED },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examComplexityEnum.ADVANCED }
		],
		hard: [
			{ uuid: '4bf4cf51-4c47-4e88-a1d6-3bfdb180e6ad', title: 'Facile', difficulty: examComplexityEnum.HARD },
			{ uuid: 'cef401d7-7eb3-493b-80a7-a18e36988603', title: 'Rue', difficulty: examComplexityEnum.HARD },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examComplexityEnum.HARD },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examComplexityEnum.HARD }
		],
		expert: [
			{ uuid: '4bf4cf51-4c47-4e88-a1d6-3bfdb180e6ad', title: 'Facile', difficulty: examComplexityEnum.EXPERT },
			{ uuid: 'cef401d7-7eb3-493b-80a7-a18e36988603', title: 'Rue', difficulty: examComplexityEnum.EXPERT },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examComplexityEnum.EXPERT },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examComplexityEnum.EXPERT }
		]
	};

	return {
		listeningComprehensionExams: mockListeningExams
	};
};
