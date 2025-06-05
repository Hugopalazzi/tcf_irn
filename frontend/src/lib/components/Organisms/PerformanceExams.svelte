<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';
	import { Chart, type ChartTypeRegistry } from 'chart.js/auto';
	import Dropdown from '@tcf/lib/components/Atoms/Dropdown.svelte';
	import type { ExamsType } from '@tcf/models/exams';
	import { t } from '@tcf/lib/helpers/tHelper';

	interface Props {
		title: string;
		description?: string;
	}

	const { title, description }: Props = $props();

	const bem = createBEM('performance');

	let chart: Chart<keyof ChartTypeRegistry> | null = null;
	let canvasElement: HTMLCanvasElement;
	const days = [t('days.monday'), t('days.tuesday'), t('days.wednesday'), t('days.thursday'), t('days.friday'), t('days.saturday'), t('days.sunday')];

	const mockLastWeekResult: Record<ExamsType, number[]> = {
		'reading-exam': [12, 14.5, 15, 0, 0, 10, 14],
		'listening-exam': [2, 1, 19, 2, 1, 3, 5],
		'writing-exam': [9, 10, 14, 2, 8, 13, 0]
	};

	$effect(() => {
		if (canvasElement && !chart) {
			chart = new Chart(canvasElement, {
				type: 'line',
				data: {
					labels: days,
					datasets: [
						{
							data: mockLastWeekResult['listening-exam'],
							borderColor: '#1E0C5B',
							borderWidth: 5,
							pointRadius: 0,
							fill: false,
							tension: 0.4
						}
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						y: {
							min: 0,
							max: 20,
							ticks: {
								stepSize: 5,
								font: {
									weight: 'bold'
								},
								color: '#000'
							}
						},
						x: {
							grid: {
								display: false
							},
							ticks: {
								font: {
									weight: 'bold'
								},
								color: '#000'
							}
						}
					},
					plugins: {
						legend: {
							display: false
						}
					}
				}
			});
		}
	});

	const updateChart = (data: number[]) => {
		if (chart) {
			chart.data.datasets[0].data = data;
			chart.update();
		}
	};

	const onClick = (examType: ExamsType) => {
		selectedItemId = examType;
		updateChart(mockLastWeekResult[examType]);
	};

	const items: { id: ExamsType; label: string; onClick: () => void }[] = [
		{
			id: 'listening-exam' as ExamsType,
			label: t('listening-exam'),
			onClick: () => onClick('listening-exam')
		},
		{
			id: 'reading-exam' as ExamsType,
			label: t('reading-exam'),
			onClick: () => onClick('reading-exam')
		},
		{
			id: 'writing-exam' as ExamsType,
			label: t('writing-exam'),
			onClick: () => onClick('writing-exam')
		}
	];

	let selectedItemId: ExamsType = $state('listening-exam');
</script>

<FrameCard {title} {description}>
	{#snippet button()}
		<Dropdown color="tertiary" bind:selectedItemId {items} />
	{/snippet}
	<div class={bem('chart-container')}>
		<canvas bind:this={canvasElement} class={bem('chart')}></canvas>
	</div>
</FrameCard>

<style lang="scss">
	.performance {
		&__bilan-text {
			font-size: rem(12);
			font-weight: 700;
			line-height: rem(16);
		}

		&__chart-container {
			width: 100%;
			height: rem(250);
		}

		&__chart {
			width: 100% !important;
			height: 100% !important;
		}
	}
</style>
