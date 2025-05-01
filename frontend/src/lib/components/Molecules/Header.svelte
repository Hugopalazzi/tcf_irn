<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';
	import DashboardIcon from '../Icons/DashboardIcon.svelte';
	import ExamsIcon from '../Icons/ExamsIcon.svelte';
	import LeaderboardIcon from '../Icons/LeaderboardIcon.svelte';
	import PttNavIcon from '../Icons/PttNavIcon.svelte';
	import SubscribeIcon from '../Icons/SubscribeIcon.svelte';
	import PeopleIcon from '../Icons/PeopleIcon.svelte';
	import DashboardLink from '../Atoms/DashboardLink.svelte';
	import { page } from '$app/state';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	const bem = createBEM('header');

	const getIconColor = (url: string) => {
		return page.url.pathname.startsWith(url) ? '#000' : '#fff';
	};

	const links = [
		{ href: `${PUBLIC_BASE_URL}/dashboard`, icon: DashboardIcon, labelKey: 'header.dashboard', path: '/dashboard' },
		{ href: `${PUBLIC_BASE_URL}/exams`, icon: ExamsIcon, labelKey: 'header.exams', path: '/exams' },
		{ href: `${PUBLIC_BASE_URL}/leaderboard`, icon: LeaderboardIcon, labelKey: 'header.leaderboard', path: '/leaderboard' },
		{ href: `${PUBLIC_BASE_URL}/profile`, icon: PeopleIcon, labelKey: 'header.profile', path: '/profile' }
	];
</script>

<header class={bem('container')}>
	<div class={bem('left')}>
		<PttNavIcon />
		<div class={bem('vertical-bar')}></div>

		<div class={bem('left-buttons-container')}>
			{#each links as { href, icon: Icon, labelKey, path }}
				<DashboardLink {href}>
					<Icon color={getIconColor(path)} />
					<span class={bem('btn-title')}>
						{$_(labelKey)}
					</span>
				</DashboardLink>
			{/each}
		</div>
	</div>
	<div class={bem('right')}>
		<a href='{PUBLIC_BASE_URL}/subscribe' class="btn btn-rounded">
			<SubscribeIcon />
		</a>
	</div>
</header>

<style lang="scss">
	.header {
		&__container {
			display: flex;
			align-items: center;
			overflow: hidden;
			margin-bottom: rem(16);
			background-color: var(--primary-color);
			padding: rem(16);

			@include min-width(tablet) {
				justify-content: space-between;
				border-bottom: rem(1.5) solid var(--secondary-500);
				flex-direction: row;
			}
		}

		&__left {
			display: flex;
			gap: rem(32);
			flex-direction: row;

			&-buttons-container {
				display: flex;
				flex-direction: row;

				gap: rem(12);
			}
		}

		&__right {
			display: flex;
			gap: rem(12);
		}
		&__vertical-bar {
			border-right: 1px solid white;
		}
		&__btn-title {
			color: rgba(255, 255, 255, 0.7);
			font-size: rem(14);
			font-style: normal;
			font-weight: 600;
			line-height: rem(20);
		}
	}
</style>
