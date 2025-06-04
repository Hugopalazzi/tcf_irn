<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';
	import { onMount } from 'svelte';
	import { Chart, type ChartTypeRegistry } from 'chart.js/auto';
	import DropdownButton from '@tcf/lib/components/Atoms/DropdownButton.svelte';

	interface Props {
		title: string;
		description?: string;
	}

	const { title, description }: Props = $props();

	const bem = createBEM('performance');

	let chart: Chart<keyof ChartTypeRegistry> | null = null;
	let canvasElement: HTMLCanvasElement;
	const days = [
		m['days.monday'](),
		m['days.tuesday'](),
		m['days.wednesday'](),
		m['days.thursday'](),
		m['days.friday'](),
		m['days.saturday'](),
		m['days.sunday']()
	];

	const mockLastWeekResult: Record<'reading' | 'listening' | 'writing', number[]> = {
		reading: [12, 14.5, 15, 0, 0, 10, 14],
		listening: [2, 1, 19, 2, 1, 3, 5],
		writing: [9, 10, 14, 2, 8, 13, 0]
	};

	onMount(() => {
		if (chart) chart.destroy();

		chart = new Chart(canvasElement, {
			type: 'line',
			data: {
				labels: days,
				datasets: [
					{
						data: mockLastWeekResult.listening,
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
	});

	const updateChart = (data: number[]) => {
		if (chart) {
			chart.data.datasets[0].data = data;
			chart.update();
		}
	};

	let dropdownButtonLabel = $state(m['recentExams.listeningExam.title']());
</script>

<FrameCard {title} {description}>
	{#snippet button()}
		<DropdownButton
			color="tertiary"
			label={dropdownButtonLabel}
			items={[
				{
					label: m['recentExams.listeningExam.title'](),
					onClick: () => {
						dropdownButtonLabel = m['recentExams.listeningExam.title']();
						updateChart(mockLastWeekResult.listening);
					}
				},
				{
					label: m['recentExams.readingExam.title'](),
					onClick: () => {
						dropdownButtonLabel = m['recentExams.readingExam.title']();
						updateChart(mockLastWeekResult.reading);
					}
				},
				{
					label: m['recentExams.writingExam.title'](),
					onClick: () => {
						dropdownButtonLabel = m['recentExams.writingExam.title']();
						updateChart(mockLastWeekResult.writing);
					}
				}
			]} />
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
