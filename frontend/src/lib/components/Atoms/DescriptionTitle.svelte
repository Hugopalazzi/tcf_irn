<script lang="ts">
	interface Props {
		text: string;
	}

	const { text }: Props = $props();
</script>

<p class="description-title">{text}</p>

<style lang="scss">
	.description-title {
		font-size: rem(14);
		font-weight: 400;
		line-height: rem(20);
        color: rgba(0, 0, 0, 0.50);
        margin: 0;
        padding: 0;
	}
</style>
