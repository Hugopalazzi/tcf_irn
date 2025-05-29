import BronzeMedalIcon from '@tcf/lib/components/Icons/BronzeMedalIcon.svelte';
import GoldMedalIcon from '@tcf/lib/components/Icons/GoldMedalIcon.svelte';
import SilverMedalIcon from '@tcf/lib/components/Icons/SilverMedalIcon.svelte';
import TropheeIcon from '@tcf/lib/components/Icons/TropheeIcon.svelte';
import { maxLevelConfig } from '@tcf/lib/configs/leveling.config';
import { m } from '$lib/paraglide/messages.js';

export const getLevelInfo = (level: number) => {
	if (level < maxLevelConfig.beginer) {
		return {
			title: m['dashboard.cardExperience.beginer'](),
			Icon: BronzeMedalIcon
		};
	} else if (level < maxLevelConfig.intermediate) {
		return {
			title: m['dashboard.cardExperience.intermediate'](),
			Icon: SilverMedalIcon
		};
	} else if (level < maxLevelConfig.advanced) {
		return {
			title: m['dashboard.cardExperience.advanced'](),
			Icon: GoldMedalIcon
		};
	} else {
		return { title: m['dashboard.cardExperience.expert'](), Icon: TropheeIcon };
	}
};
