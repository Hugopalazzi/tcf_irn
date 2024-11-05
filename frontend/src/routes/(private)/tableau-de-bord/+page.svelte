<script lang="ts">
	import Bar from './Bar.svelte';

	const mockBar: { libelle: string; valeur: string[] }[] = [
		{
			libelle: 'Dates',
			valeur: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
		},
		{
			libelle: 'LC',
			valeur: ['1', '2', '42', '10', '22', '2', '2']
		},
		{
			libelle: 'OC',
			valeur: ['25', '22', '12', '14', '10', '2', '0']
		},
		{
			libelle: 'WE',
			valeur: ['4', '2', '1', '7', '0', '22', '15']
		}
	];
</script>

<h1>Dashboard</h1>
<h3>Hello, Aryan 👋​</h3>
<div class="graph-title-wrapper">
	<span class="graph-title">Tests Completed In Past 7 Days </span>
	<div class="centered-graph">
		<Bar dataSet={mockBar} />
	</div>
</div>

<style lang="scss">
	h1 {
		margin-bottom: rem(8);
	}
	.graph-title-wrapper {
		display: grid;
		gap: rem(16);
		background-color: var(--bg-card-grey);
		border-radius: rem(20);
		padding: rem(16) rem(24);
		justify-items: center;
		font-weight: 600;

		.graph-title {
			padding-bottom: rem(8);
			color: var(--title-card-grey);
		}

		.centered-graph {
			display: flex;
			width: 100%;
			overflow-x: auto;
			overflow-y: hidden;
			white-space: nowrap;
		}

		@include min-width(desktop-large) {
			justify-self: center;
			min-width: rem(1100);
		}
	}
</style>
