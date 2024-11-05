<script lang="ts">
	import Bar from './Bar.svelte';

	const mockBar: { libelle: string; valeur: string[] }[] = [
		{
			libelle: 'Dates',
			valeur: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
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
<div class="centered-content">
	<span class="graph-title">Tests Completed In Past 7 Days </span>
	<Bar dataSet={mockBar} />
</div>

<style lang="scss">
	h1 {
		margin-bottom: rem(8);
	}

	.centered-content {
		justify-self: center;
		background-color: #262a34;
		padding: rem(12);
		border-radius: rem(20);

		.graph-title {
			color: #5e6272;
		}
	}
</style>
