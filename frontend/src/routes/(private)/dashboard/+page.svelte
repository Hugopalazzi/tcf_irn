<script lang="ts">
	import CheckListIcon from '@tcf/lib/components/Icons/CheckListIcon.svelte';
	import FailureScoreIcon from '@tcf/lib/components/Icons/FailureScoreIcon.svelte';
	import ListeningIcon from '@tcf/lib/components/Icons/ListeningIcon.svelte';
	import ReadingIcon from '@tcf/lib/components/Icons/ReadingIcon.svelte';
	import SuccessScoreIcon from '@tcf/lib/components/Icons/SuccessScoreIcon.svelte';
	import WritingIcon from '@tcf/lib/components/Icons/WritingIcon.svelte';
	import TitleWithDescription from '@tcf/lib/components/Molecules/TitleWithDescription.svelte';
	import LinkCards from '@tcf/lib/components/Organisms/LinkCards.svelte';
	import ScoreCards from '@tcf/lib/components/Organisms/ScoreCards.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';
	import type { PageData } from './$types';

	const bem = createBEM('dashboard');

	const { data }: { data: PageData } = $props();

	const dashboardCardLinksKey = 'dashboard.cardLinks';
	const cardLinks = [
		{
			url: $_(`${dashboardCardLinksKey}.listeningExams.url`),
			title: $_(`${dashboardCardLinksKey}.listeningExams.title`),
			description: $_(`${dashboardCardLinksKey}.listeningExams.description`),
			Icon: ListeningIcon
		},
		{
			url: $_(`${dashboardCardLinksKey}.readingExams.url`),
			title: $_(`${dashboardCardLinksKey}.readingExams.title`),
			description: $_(`${dashboardCardLinksKey}.readingExams.description`),
			Icon: ReadingIcon
		},
		{
			url: $_(`${dashboardCardLinksKey}.writingExams.url`),
			title: $_(`${dashboardCardLinksKey}.writingExams.title`),
			description: $_(`${dashboardCardLinksKey}.writingExams.description`),
			Icon: WritingIcon
		}
	];

	const cardScores = [
		{
			result: '03',
			title: 'Exams Taken',
			backgroundIconColor: 'blue-gradient' as GradientColorsType,
			Icon: CheckListIcon
		},
		{
			result: '89%',
			title: 'Success Score',
			backgroundIconColor: 'green-gradient' as GradientColorsType,
			Icon: SuccessScoreIcon
		},
		{
			result: '19%',
			title: 'Failure Score',
			backgroundIconColor: 'red-gradient' as GradientColorsType,
			Icon: FailureScoreIcon
		}
	];
</script>

<div class={bem('container')}>
	<div class={bem('welcome-card')}>
		<img
			src={data.user.user_metadata.avatar_url ? data.user.user_metadata.avatar_url : '/assets/images/user-profile.jpg'}
			class={bem('user-profile-image')}
			alt={bem('dashboard.altUserImage')} />
		<p class={bem('welcome-label')}>{$_('dashboard.welcome')}{data.user.user_metadata.name} !</p>
	</div>
	<TitleWithDescription title={$_('dashboard.title')} description={$_('dashboard.description')} />
	<LinkCards links={cardLinks} />
	<ScoreCards scores={cardScores} />
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
	}
</style>
