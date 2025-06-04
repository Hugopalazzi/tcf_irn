import { examLevelEnum, type Exam, type ExamLevelType } from '@tcf/models/exams';

export const load = async () => {
	const mockListeningExams: Record<ExamLevelType, Exam[]> = {
		[examLevelEnum.EASY]: [
			{ uuid: '1341f365-896a-42bc-91f6-fbc621be2259', title: 'Entrainement', difficulty: examLevelEnum.EASY },
			{ uuid: 'ee349634-e817-47ec-8a74-53a7280e0c96', title: 'Tester votre niveau', difficulty: examLevelEnum.EASY },
			{ uuid: 'e5455f5a-792f-4e44-ade9-bbac3d9c6def', title: 'Chien', difficulty: examLevelEnum.EASY },
			{ uuid: '5b2f0ba8-1164-4315-938a-b2e6cd4cbfbd', title: 'Maison', difficulty: examLevelEnum.EASY }
		],
		[examLevelEnum.INTERMEDIATE]: [
			{ uuid: '4bf4cf51-4c47-4e88-a1d6-3bfdb180e6ad', title: 'Facile', difficulty: examLevelEnum.INTERMEDIATE },
			{ uuid: 'cef401d7-7eb3-493b-80a7-a18e36988603', title: 'Rue', difficulty: examLevelEnum.INTERMEDIATE },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examLevelEnum.INTERMEDIATE },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examLevelEnum.INTERMEDIATE }
		],
		[examLevelEnum.ADVANCED]: [
			{ uuid: '4bf4cf51-4c47-4e88-a1d6-3bfdb180e6ad', title: 'Facile', difficulty: examLevelEnum.ADVANCED },
			{ uuid: 'cef401d7-7eb3-493b-80a7-a18e36988603', title: 'Rue', difficulty: examLevelEnum.ADVANCED },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examLevelEnum.ADVANCED },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examLevelEnum.ADVANCED }
		],
		[examLevelEnum.HARD]: [
			{ uuid: '4bf4cf51-4c47-4e88-a1d6-3bfdb180e6ad', title: 'Facile', difficulty: examLevelEnum.HARD },
			{ uuid: 'cef401d7-7eb3-493b-80a7-a18e36988603', title: 'Rue', difficulty: examLevelEnum.HARD },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examLevelEnum.HARD },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examLevelEnum.HARD }
		],
		[examLevelEnum.EXPERT]: [
			{ uuid: '4bf4cf51-4c47-4e88-a1d6-3bfdb180e6ad', title: 'Facile', difficulty: examLevelEnum.EXPERT },
			{ uuid: 'cef401d7-7eb3-493b-80a7-a18e36988603', title: 'Rue', difficulty: examLevelEnum.EXPERT },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examLevelEnum.EXPERT },
			{ uuid: '9f0cc74b-f479-4944-a337-abceabb740e6', title: 'Adresse postale', difficulty: examLevelEnum.EXPERT }
		]
	};

	return {
		listeningComprehensionExams: mockListeningExams
	};
};
