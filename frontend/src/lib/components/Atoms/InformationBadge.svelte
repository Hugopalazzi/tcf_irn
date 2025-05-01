<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';

	interface Props {
		title: string;
		description: string;
	}
	const bem = createBEM('information-badge');

	let { title, description }: Props = $props();
</script>

<div class={bem('container')}>
	<div class={bem('rectangle')}></div>
	<div class={bem('content')}>
		<h3 class={bem("title")}>{title}</h3>
		<p class={bem("description")}>{description}</p>
	</div>
</div>

<style lang="scss">
	.information-badge {
		&__container {
			display: flex;
			flex-direction: row;
			padding: rem(12) rem(20);
			background-color: #1e0c5b0d;
			border-radius: rem(60);
			gap: rem(20);
            align-items: center;
            width: 80%;
		}

		&__rectangle {
			width: rem(16);
			height: rem(8);
			background-color: #1e0c5b;
			border-radius: rem(30);
		}

		&__content {
			display: flex;
			flex-direction: column;
			gap: rem(4);
		}

        &__title {
            font-size: rem(14);
            color: #000000;
            font-weight: 700;
            line-height: rem(20);
        }

        &__description {
            font-size: rem(12);
            color: rgba(0, 0, 0, 0.5);
            font-weight: 400;
            line-height: rem(16);
        }
	}
</style>
