<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { m } from '$lib/paraglide/messages.js';
	import { t } from '@tcf/lib/helpers/tHelper';

	type Exam = {
		type: string;
		date: string;
		score: string;
		level: string;
		duration: string;
		statusCode: string;
		progress: number;
		actions: string[];
	};

	interface ExamsTableProps {
		examData: Exam[];
	}

	const { examData }: ExamsTableProps = $props();

	const bem = createBEM('exams-table');
</script>

<div class="table-wrapper">
	<table summary={m['examHistoryPage.card.description']()} class={bem()}>
		<thead class={bem('head')}>
			<tr>
				<th scope="col" class={bem('head-cell')}>Examen</th>
				<th scope="col" class={bem('head-cell')}>Date</th>
				<th scope="col" class={bem('head-cell')}>Score</th>
				<th scope="col" class={bem('head-cell')}>Catégorie</th>
				<th scope="col" class={bem('head-cell')}>Temps</th>
				<th scope="col" class={bem('head-cell')}>Status</th>
				<th scope="col" class={bem('head-cell')}>Progrès</th>
				<th scope="col" class={bem('head-cell')}></th>
			</tr>
		</thead>
		<tbody class={bem('body')}>
			{#each examData as { type, date, score, level, duration, statusCode, progress, actions }, i}
				{@const isPair = i % 2 == 0}
				<tr class={bem('row')}>
					<th scope="row" class={bem('cell', { shadowed: isPair })}>{t(type)}</th>
					<td class={bem('cell', { shadowed: isPair })}>{date}</td>
					<td class={bem('cell', { shadowed: isPair })}>{score}</td>
					<td class={bem('cell', { shadowed: isPair })}>{level}</td>
					<td class={bem('cell', { shadowed: isPair })}>{duration}</td>
					<td class={bem('cell', { shadowed: isPair })}>{t(`status.${statusCode}`)}</td>
					<td class={bem('cell', { shadowed: isPair })}>
						<div class="progress-bar" style="width: {progress}%;">{progress}%</div>
					</td>
					<td class={bem('cell', { shadowed: isPair })}>
						{#each actions as action}
							<button class="action-button">{action}</button>
						{/each}
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
		}

		&__row {
			th,
			td {
				font-weight: 600;
			}
		}

		&__cell {
			padding: 8px;

			&:first-child {
				border-top-left-radius: 10px;
				border-bottom-left-radius: 10px;
			}

			&:last-child {
				border-top-right-radius: 10px;
				border-bottom-right-radius: 10px;
			}

			&--shadowed {
				box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.08);
			}
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
