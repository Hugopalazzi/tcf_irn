import BronzeMedalIcon from '@tcf/lib/components/Icons/BronzeMedalIcon.svelte';
import GoldMedalIcon from '@tcf/lib/components/Icons/GoldMedalIcon.svelte';
import SilverMedalIcon from '@tcf/lib/components/Icons/SilverMedalIcon.svelte';
import TropheeIcon from '@tcf/lib/components/Icons/TropheeIcon.svelte';
import { maxLevelConfig } from '@tcf/lib/configs/leveling.config';

export const getLevelInfo = (level: number, translation: any) => {
	if (level < maxLevelConfig.beginer) {
		return { title: translation('dashboard.cardExperience.beginer'), Icon: BronzeMedalIcon };
	} else if (level < maxLevelConfig.intermediate) {
		return { title: translation('dashboard.cardExperience.intermediate'), Icon: SilverMedalIcon };
	} else if (level < maxLevelConfig.advanced) {
		return { title: translation('dashboard.cardExperience.advanced'), Icon: GoldMedalIcon };
	} else {
		return { title: translation('dashboard.cardExperience.expert'), Icon: TropheeIcon };
	}
};
