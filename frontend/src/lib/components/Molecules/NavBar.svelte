<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';
	import DashboardIcon from '../Icons/DashboardIcon.svelte';
	import ExamsIcon from '../Icons/ExamsIcon.svelte';
	import LeaderboardIcon from '../Icons/LeaderboardIcon.svelte';
	import PttNavIcon from '../Icons/PttNavIcon.svelte';
	import SubscribeIcon from '../Icons/SubscribeIcon.svelte';
	import PeopleIcon from '../Icons/PeopleIcon.svelte';

	const bem = createBEM('topnav');
</script>

<div class={bem('container')}>
	<div class={bem('left')}>
		<PttNavIcon />
		<div class={bem('vertical-bar')}></div>
		<div class={bem('left-buttons-container')}>
			<a href="/dashboard" class="btn btn-primary active">
				<DashboardIcon />
				<span>Dashboard</span>
			</a>
			<a href="/exams" class="btn btn-primary">
				<ExamsIcon />
				<span>{$_('navBar.exams')}</span>
			</a>
			<a href="/leaderboard" class="btn btn-primary">
				<LeaderboardIcon />
				<span>Leaderboard</span>
			</a>
			<a href="/profile" class="btn btn-primary">
				<PeopleIcon />
				<span>{$_('navBar.profile')}</span>
			</a>
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
	}
</style>
