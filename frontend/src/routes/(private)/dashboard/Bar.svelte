<script lang="ts">
	import { Chart } from 'chart.js/auto';

	export let dataSet: {
		libelle: string;
		valeur: string[];
	}[] = [];

	const dates = dataSet.find((data) => data.libelle === 'Dates')?.valeur ?? [];
	const listeningComprehensionData = dataSet.find((data) => data.libelle === 'LC')?.valeur ?? [];
	const oralComprehensionData = dataSet.find((data) => data.libelle === 'OC')?.valeur ?? [];
	const writtenExpressionData = dataSet.find((data) => data.libelle === 'WE')?.valeur ?? [];

	let dataChart = {
		labels: dates,
		datasets: [
			{
				label: 'Compréhension écrite',
				data: listeningComprehensionData,
				borderWidth: 0,
				backgroundColor: '#FBA3FF',
				borderRadius: 16
			},
			{
				label: 'Compréhension orale',
				data: oralComprehensionData,
				borderWidth: 0,
				backgroundColor: '#7269E3',
				borderRadius: 16
			},
			{
				label: 'Expression écrite',
				data: writtenExpressionData,
				borderWidth: 0,
				backgroundColor: '#A06AF9',
				borderRadius: 16
			}
		]
	};

	let chartInstance: Chart<'bar', number[] | string[]>;

	function myChart(element: HTMLCanvasElement) {
		chartInstance = new Chart<'bar', number[] | string[]>(element, {
			type: 'bar',
			data: dataChart,
			options: {
				responsive: true,
				resizeDelay: 200,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: 'bottom',
						display: true
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								const dataset = context.dataset;
								const value = dataset.data[context.dataIndex] ?? 0;
								const totalOfDay =
									Number(listeningComprehensionData[context.dataIndex]) +
									Number(oralComprehensionData[context.dataIndex]) +
									Number(writtenExpressionData[context.dataIndex]);
								let ratio = 0;
								if (totalOfDay !== 0) {
									ratio = +value / totalOfDay;
								}
								return `${context.dataset.data[context.dataIndex]} (${(ratio * 100).toFixed(2)} %)`;
							},
							title: function (context) {
								return context[0].dataset.label;
							}
						}
					}
				}
			}
		});
		return {
			destroy: () => chartInstance.destroy()
		};
	}
</script>

<div class="bar">
	<canvas use:myChart></canvas>
</div>

<style lang="scss">
	.bar {
		border: none;
		max-width: rem(1000);
		min-width: rem(400);
		min-height: rem(350);
		width: 100%;
		
		@include min-width(desktop) {
			justify-content: center;
			padding: 0 rem(72);
		}
	}
</style>
