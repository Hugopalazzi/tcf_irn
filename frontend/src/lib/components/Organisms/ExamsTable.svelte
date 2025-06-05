<script lang="ts">
	import { goto } from '$app/navigation';
	import Link from '@tcf/lib/components/Atoms/Link.svelte';
	import ProgressBar from '@tcf/lib/components/Atoms/ProgressBar.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { t } from '@tcf/lib/helpers/tHelper';
	import { ColorsEnum } from '@tcf/models/colors';
	import { statusCodeEnum } from '@tcf/models/exams';

	type Exam = {
		id: string;
		type: string;
		date: string;
		score: string;
		level: string;
		duration: string;
		statusCode: string;
		progress: number;
	};

	interface ExamsTableProps {
		examData: Exam[];
	}

	const { examData }: ExamsTableProps = $props();

	const bem = createBEM('exams-table');

	const onClickRetake = (event: MouseEvent | undefined, examType: string, examId: string) => {
		event?.preventDefault();
		//TODO: Remove all answers on these exam for the current user
		goto(`/exams/${examType}/${examId}`);
	};
</script>

<div class="table-wrapper">
	<table summary={t('examHistoryPage.card.description')} class={bem()}>
		<thead class={bem('head')}>
			<tr>
				<th scope="col" class={bem('head-cell')}>{t('examsTable.head.examLabel')}</th>
				<th scope="col" class={bem('head-cell')}>{t('examsTable.head.dateLabel')}</th>
				<th scope="col" class={bem('head-cell')}>{t('examsTable.head.scoreLabel')}</th>
				<th scope="col" class={bem('head-cell')}>{t('examsTable.head.categoryLabel')}</th>
				<th scope="col" class={bem('head-cell')}>{t('examsTable.head.timeLabel')}</th>
				<th scope="col" class={bem('head-cell')}>{t('examsTable.head.statusLabel')}</th>
				<th scope="col" class={bem('head-cell')}>{t('examsTable.head.progressLabel')}</th>
				<th scope="col" class={bem('head-cell')}></th>
			</tr>
		</thead>
		<tbody class={bem('body')}>
			{#each examData as { id, type, date, score, level, duration, statusCode, progress }, i}
				{@const isPair = i % 2 == 0}
				<tr class={bem('row', { shadowed: isPair })}>
					<th scope="row" class={bem('cell')}>{t(type)}</th>
					<td class={bem('cell')}>{date}</td>
					<td class={bem('cell')}>{score}</td>
					<td class={bem('cell')}>{level}</td>
					<td class={bem('cell')}>{duration}</td>
					<td class={bem('cell')}>{t(`status.${statusCode}`)}</td>
					<td class={bem('cell')}>
						<div class={bem('progress-bar-container')}>
							<ProgressBar {progress} />
							<div class="progress-bar" style="width: {progress}%;">{progress}%</div>
						</div>
					</td>
					<td class={bem('cell')}>
						{#if statusCode === statusCodeEnum.COMPLETED}
							<div class={bem('links-container')}>
								<Link color={ColorsEnum.PRIMARY} url={`/exams/${type}/${id}`} label={t('examHistoryPage.links.results')} extraClass={bem('link')} />
								<Link
									color={ColorsEnum.SECONDARY}
									url={`/exams/${type}/${id}`}
									label={t('examHistoryPage.links.retry')}
									extraClass={bem('link')}
									onClick={(event) => onClickRetake(event, type, id)} />
							</div>
						{:else if statusCode === statusCodeEnum.PENDING}
							<Link color={ColorsEnum.PRIMARY} url={`/exams/${type}/${id}`} label={t('examHistoryPage.links.continue')} extraClass={bem('link')} />
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	.table-wrapper {
		overflow-x: auto;
		width: 100%;
		box-sizing: border-box;
		padding: 0 12px;
	}
	.exams-table {
		border-collapse: separate;
		border-spacing: 0 12px;
		width: 100%;
		text-align: left;

		&__body {
			color: #000;
			font-size: rem(12);
			font-weight: 600;
			line-height: rem(16);
			letter-spacing: 0.36px;
		}

		&__head {
			tr {
				th {
					border-bottom: 1px solid #e3e8ef;
					margin-bottom: 8px;
					color: #121926;
					font-size: 12px;
					font-weight: 500;
					line-height: 16px;
				}
			}
		}

		&__head-cell {
			padding: 12px;
			color: #121926;
			font-size: 12px;
			font-weight: 500;
			line-height: 16px;
		}

		&__row {
			th,
			td {
				font-weight: 600;
			}
			&--shadowed {
				border-radius: 10px;
				box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.08);
			}
		}

		&__cell {
			padding: 8px;
		}

		&__links-container {
			display: flex;
			gap: 4px;
		}

		&__progress-bar-container {
			display: flex;
			align-items: center;
			gap: 12px;
		}
	}

	@media (min-width: 768px) {
		.exams-table {
			&__cell {
				padding: 12px;
			}
		}
	}
</style>
