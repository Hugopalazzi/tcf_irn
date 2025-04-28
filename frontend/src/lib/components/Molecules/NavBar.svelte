<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';
	import DashboardIcon from '../Icons/DashboardIcon.svelte';
	import ExamsIcon from '../Icons/ExamsIcon.svelte';
	import LeaderboardIcon from '../Icons/LeaderboardIcon.svelte';
	import PttNavIcon from '../Icons/PttNavIcon.svelte';
	import SubscribeIcon from '../Icons/SubscribeIcon.svelte';
	import PeopleIcon from '../Icons/PeopleIcon.svelte';
	import DashboardButton from '../Atoms/DashboardButton.svelte';
	import { page } from '$app/state';

	const bem = createBEM('topnav');

	function getIconColor(btnUrl: string): string {
		return page.url.pathname.startsWith(btnUrl) ? '#000' : '#fff';
	}
</script>

<div class={bem('container')}>
	<div class={bem('left')}>
		<PttNavIcon />
		<div class={bem('vertical-bar')}></div>
		<div class={bem('left-buttons-container')}>
			<DashboardButton href="/dashboard">
				<DashboardIcon color={getIconColor('/dashboard')} />
				<span class={bem('btn-title')}>Dashboard</span>
			</DashboardButton>
			<DashboardButton href="/exams">
				<ExamsIcon color={getIconColor('/exams')} />
				<span class={bem('btn-title')}>{$_('navBar.exams')}</span>
			</DashboardButton>
			<DashboardButton href="/leaderboard">
				<LeaderboardIcon color={getIconColor('/leaderboard')} />
				<span class={bem('btn-title')}>Leaderboard</span>
			</DashboardButton>
			<DashboardButton href="/profile">
				<PeopleIcon color={getIconColor('/profile')} />
				<span class={bem('btn-title')}>{$_('navBar.profile')}</span>
			</DashboardButton>
		</div>
	</div>
	<div class={bem('right')}>
		<a class="btn btn-rounded">
			<SubscribeIcon />
		</a>
	</div>
</div>

<style lang="scss">
	.topnav {
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

			.btn-rounded button {
				padding: 0;
			}
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
