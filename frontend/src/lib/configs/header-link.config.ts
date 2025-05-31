import DashboardIcon from '@tcf/lib/components/Icons/DashboardIcon.svelte';
import ExamsIcon from '@tcf/lib/components/Icons/ExamsIcon.svelte';
import LeaderboardIcon from '@tcf/lib/components/Icons/LeaderboardIcon.svelte';
import PeopleIcon from '@tcf/lib/components/Icons/PeopleIcon.svelte';
import LogoutIcon from '@tcf/lib/components/Icons/LogoutIcon.svelte';
import SubscribeIcon from '@tcf/lib/components/Icons/SubscribeIcon.svelte';

type SecondaryHeaderKey = 'header.subscribe' | 'header.logout';
type PrimaryHeaderKey = 'header.dashboard' | 'header.exams' | 'header.leaderboard' | 'header.profile';

export const primaryHeaderLinks = [
	{ icon: DashboardIcon, labelKey: 'header.dashboard' as PrimaryHeaderKey, path: '/dashboard' },
	{ icon: ExamsIcon, labelKey: 'header.exams' as PrimaryHeaderKey, path: '/exams' },
	{
		icon: LeaderboardIcon,
		labelKey: 'header.leaderboard' as PrimaryHeaderKey,
		path: '/leaderboard'
	},
	{ icon: PeopleIcon, labelKey: 'header.profile' as PrimaryHeaderKey, path: '/profile' }
];

export const secondaryHeaderLinks = [
	{ icon: SubscribeIcon, key: 'header.subscribe' as SecondaryHeaderKey, path: '/subscribe' },
	{ icon: LogoutIcon, key: 'header.logout' as SecondaryHeaderKey, path: '/logout' }
];
