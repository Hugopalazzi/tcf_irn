<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import FrameCard from '@tcf/lib/components/Organisms/FrameCard.svelte';

	interface Props {
		title: string;
		description?: string;
	}

	const { title, description }: Props = $props();

	const bem = createBEM('performance');
</script>

<FrameCard {title} {description}>
	<div>
		<p class={bem('bilan-text')}>
			You improved by 3 points in Listening this week!
		</p>
	</div>
</FrameCard>

<style lang="scss">
	.performance {
		&__bilan-text {
			font-size: rem(12);
			font-weight: 700;
			line-height: rem(16);
		}

		@media (min-width: $breakpoint-desktop) {
			.recent-exams {
				&__current-exam {
					padding: rem(16);
				}
			}
		}
	}
</style>
