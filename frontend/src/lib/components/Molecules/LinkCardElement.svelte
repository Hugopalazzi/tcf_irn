<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import type { Component } from 'svelte';

	export type LinkCardElementProps = {
		url: string;
		title: string;
		description: string;
		Icon?: Component<any>;
	};

	const { url, title, description, Icon }: LinkCardElementProps = $props();
	const uuid = $props.id();
	const bem = createBEM('link-card');
</script>

<a href={url} aria-describedby={uuid} class={bem('container')}>
	<div class={bem('sub-container')}>
		{#if Icon}
			<div class={bem('icon-container')}><Icon /></div>
		{/if}
		<div class={bem('text-container')}>
			<h2 id={uuid} class={bem('title')}>{title}</h2>
			<p class={bem('description')}>{description}</p>
		</div>
	</div>
</a>

<style lang="scss">
	.link-card {
		&__container {
			display: flex;
			padding: rem(8) rem(20) rem(8) rem(8);
			align-items: center;
			gap: rem(12);
			flex: 1 0 0;
			border-radius: rem(20);
			background: #a3e7fc;
			justify-content: space-between;
		}

		&__sub-container {
			display: flex;
			align-items: center;
			gap: rem(12);
		}

		&__icon-container {
			display: flex;
			padding: rem(10);
			justify-content: center;
			align-items: center;
			gap: rem(8);
			border-radius: rem(12);
			background: #1e0c5b;
		}

		&__text-container {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: rem(4);
		}

		&__title {
			color: #000;
			font-size: rem(14);
			font-weight: 700;
			line-height: rem(16);
			align-self: stretch;
			margin: 0;
		}

		&__description {
			color: rgba(0, 0, 0, 0.8);
			font-size: rem(12);
			font-weight: 500;
			line-height: rem(16);
			align-self: stretch;
			margin: 0;
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.link-card {
			&__container {
				padding: rem(16) rem(20) rem(16) rem(16);
				gap: rem(16);
			}

			&__title {
				font-size: rem(20);
				line-height: rem(20);
			}

			&__description {
				line-height: rem(20);
			}

			&__icon-container {
				padding: rem(10);
			}
		}
	}
</style>
