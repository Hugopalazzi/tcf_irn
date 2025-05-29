<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { m } from '$lib/paraglide/messages.js';
	import DashboardIcon from '$lib/components/Icons/DashboardIcon.svelte';
	import ExamsIcon from '$lib/components/Icons/ExamsIcon.svelte';
	import LeaderboardIcon from '$lib/components/Icons/LeaderboardIcon.svelte';
	import PttNavIcon from '$lib/components/Icons/PttNavIcon.svelte';
	import PeopleIcon from '$lib/components/Icons/PeopleIcon.svelte';
	import HeaderLink from '$lib/components/Atoms/HeaderLink.svelte';
	import { page } from '$app/state';

	const bem = createBEM('header-nav-bar');

	const getIconColor = (isActive: boolean) => {
		return isActive ? '#000' : '#fff';
	};

	const links = [
		{ icon: DashboardIcon, labelKey: 'header.dashboard', path: '/dashboard' },
		{ icon: ExamsIcon, labelKey: 'header.exams', path: '/exams' },
		{
			icon: LeaderboardIcon,
			labelKey: 'header.leaderboard',
			path: '/leaderboard'
		},
		{ icon: PeopleIcon, labelKey: 'header.profile', path: '/profile' }
	];
</script>

<div class={bem('container')}>
	<PttNavIcon />
	<div class={bem('vertical-bar')}></div>

	<div class={bem('buttons-list')}>
		{#each links as { icon: Icon, labelKey, path }}
			{@const isActive = page.url.pathname.startsWith(path)}
			<HeaderLink href={path} {isActive} label={m[labelKey]()}>
				<Icon color={getIconColor(isActive)} />
			</HeaderLink>
		{/each}
	</div>
</div>

<style lang="scss">
	.header-nav-bar {
		&__container {
			display: flex;
			gap: rem(32);
			flex-direction: row;
		}

		&__vertical-bar {
			border-right: 1px solid white;
		}

		&__buttons-list {
			display: flex;
			flex-direction: row;

			gap: rem(12);
		}
	}
</style>
