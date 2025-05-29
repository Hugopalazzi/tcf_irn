<script lang="ts">
	import CheckListIcon from '@tcf/lib/components/Icons/CheckListIcon.svelte';
	import ListeningIcon from '@tcf/lib/components/Icons/ListeningIcon.svelte';
	import ReadingIcon from '@tcf/lib/components/Icons/ReadingIcon.svelte';
	import SuccessScoreIcon from '@tcf/lib/components/Icons/SuccessScoreIcon.svelte';
	import WritingIcon from '@tcf/lib/components/Icons/WritingIcon.svelte';
	import TitleWithDescription from '@tcf/lib/components/Molecules/TitleWithDescription.svelte';
	import LinkCards from '@tcf/lib/components/Organisms/LinkCards.svelte';
	import ScoreCards from '@tcf/lib/components/Organisms/ScoreCards.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { gradientColorsEnum } from '@tcf/models/gradientColors';
	import { m } from '$lib/paraglide/messages.js';
	import type { PageData } from './$types';
	import RecentExams from '@tcf/lib/components/Organisms/RecentExams.svelte';
	import PerformanceExams from '@tcf/lib/components/Organisms/PerformanceExams.svelte';

	const bem = createBEM('dashboard');

	const { data }: { data: PageData } = $props();

	const {
		user: {
			user_metadata: { name, avatar_url }
		}
	} = data;

	const dashboardCardLinksKey = 'dashboard.cardLinks';
	const cardLinks = [
		{
			url: m[`${dashboardCardLinksKey}.listeningExams.url`](),
			title: m[`${dashboardCardLinksKey}.listeningExams.title`](),
			description: m[`${dashboardCardLinksKey}.listeningExams.description`](),
			Icon: ListeningIcon
		},
		{
			url: m[`${dashboardCardLinksKey}.readingExams.url`](),
			title: m[`${dashboardCardLinksKey}.readingExams.title`](),
			description: m[`${dashboardCardLinksKey}.readingExams.description`](),
			Icon: ReadingIcon
		},
		{
			url: m[`${dashboardCardLinksKey}.writingExams.url`](),
			title: m[`${dashboardCardLinksKey}.writingExams.title`](),
			description: m[`${dashboardCardLinksKey}.writingExams.description`](),
			Icon: WritingIcon
		}
	];

	const cardScores = [
		{
			result: '03',
			title: m['dashboard.cardScores.examsTaken'](),
			backgroundIconColor: gradientColorsEnum.BLUE,
			Icon: CheckListIcon
		},
		{
			result: '89%',
			title: m['dashboard.cardScores.successScore'](),
			backgroundIconColor: gradientColorsEnum.GREEN,
			Icon: SuccessScoreIcon
		}
	];

	const recentExams = {
		listeningExam: {
			daysAgo: 2,
			grade: 4,
			link: '/exam/listening'
		},
		readingExam: {
			daysAgo: 5,
			grade: 3,
			link: '/exam/reading'
		},
		writingExam: {
			daysAgo: 1,
			grade: 5,
			link: '/exam/writing'
		}
	};
</script>

<div class={bem('container')}>
	<div class={bem('welcome-card')}>
		<img
			src={avatar_url || '/assets/images/user-profile.jpg'}
			class={bem('user-profile-image')}
			alt={m['dashboard.altUserImage']()} />
		<p class={bem('welcome-label')}>{m['dashboard.welcome']()}{name} !</p>
	</div>
	<TitleWithDescription
		title={m['dashboard.title']()}
		description={m['dashboard.description']()} />
	<LinkCards links={cardLinks} />
	<ScoreCards scores={cardScores} />

	<div class={bem('performance-recent')}>
		<PerformanceExams
			title={m['performance.title']()}
			description={m['performance.description']()} />
		<RecentExams
			title={m['recentExams.title']()}
			description={m['recentExams.description']()}
			exams={recentExams} />
	</div>
</div>

<style lang="scss">
	.dashboard {
		&__container {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 16px;
			padding: 16px 0;
		}

		&__welcome-card {
			border-radius: 60px;
			background: rgba(30, 12, 91, 0.05);
			display: inline-flex;
			padding: 8px 20px 8px 8px;
			justify-content: center;
			align-items: center;
			gap: 16px;
		}

		&__welcome-label {
			color: #1e0c5b;
			font-size: 16px;
			font-style: normal;
			font-weight: 700;
			line-height: 24px;
		}

		&__user-profile-image {
			border-radius: 46px;
			width: 46px;
			height: 46px;
		}

		&__performance-recent {
			display: flex;
			flex-direction: column;
			width: 100%;
			gap: rem(20);
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.dashboard {
			&__performance-recent {
				display: grid;
				grid-template-columns: 1.5fr 1fr;
			}
		}
	}
</style>
