<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import ArrowRightIcon from '../Icons/ArrowRightIcon.svelte';

	interface Props {
		links: Array<{ label: string; href: string }>;
	}
	let { links }: Props = $props();

	const bem = createBEM('breadcrumb');
</script>

<div class={bem("container")}>
	{#each links as link, i}
		<div class={bem("item")}>
			{#if i > 0}
				<ArrowRightIcon />
			{/if}
			<a class={bem('link', { last: i === links.length - 1 })} href={link.href} aria-current={i === links.length - 1 ? 'page' : undefined}>
				{link.label}
			</a>
		</div>
	{/each}
</div>

<style lang="scss">
    .breadcrumb {
        &__container {
            display: flex;
            align-items: center;
            gap: rem(8);
        }

        &__item {
            display: flex;
            align-items: center;
            gap: rem(8);
        }

        &__link {
            color: rgba(0, 0, 0, 0.50);
            text-decoration: none;
            font-weight: 400;
            line-height: rem(20);
            font-size: rem(14);

            &--last {
                color: #000;
                font-weight: 700;

            }
        }
    }       
</style>
