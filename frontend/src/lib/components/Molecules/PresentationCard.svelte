<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { m } from '$lib/paraglide/messages.js';
	import InformationBadge from '@tcf/lib/components/Atoms/InformationBadge.svelte';

	const bem = createBEM('presentation-card');
	const informationBadgesKey = ['comprehensiveExams', 'gamifiedLearning', 'corrections'];
</script>

<div class={bem('container')}>
	<span class={bem('badge')}>{m['presentationCard.badge']()}</span>
	<h2 class={bem('welcome')}>
		{m['presentationCard.welcome']()}
		<span class={bem('additional-welcome')}>
			{m['presentationCard.brand']()}
		</span>
	</h2>
	<p class={bem('description')}>
		{m['presentationCard.description']()}
	</p>
	{#if informationBadgesKey.length > 0}
		{#each informationBadgesKey as key (key)}
			<InformationBadge
				title={m[`presentationCard.informationBadges.${key}.title`]()}
				description={m[`presentationCard.informationBadges.${key}.description`]()} />
		{/each}
	{/if}
</div>

<style lang="scss">
	.presentation-card {
		&__container {
			display: flex;
			flex-direction: column;
			gap: rem(12);
		}

		&__badge {
			font-size: rem(16);
			font-weight: 700;
			background-color: #1e0c5b0d;
			color: #1e0c5b;
			padding: rem(12) rem(24);
			border-radius: rem(60);
			width: fit-content;
		}

		&__welcome {
			font-size: rem(52);
			font-weight: 700;
			color: #000000;
			display: inline-flex;
			flex-direction: column;
		}

		&__additional-welcome {
			font-size: rem(80);
			font-weight: 700;
			color: #1e0c5b;
		}

		&__description {
			font-size: rem(16);
			font-weight: 400;
			color: rgba(0, 0, 0, 0.5);
			line-height: 1.5;
		}
	}
</style>
