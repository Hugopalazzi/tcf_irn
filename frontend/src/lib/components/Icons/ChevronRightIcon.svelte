<script lang="ts">
	interface Props {
		color?: string;
	}

	const { color = '#ACACAC' }: Props = $props();
</script>

<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M5.52876 3.52858C5.78911 3.26823 6.21122 3.26823 6.47157 3.52858L10.4716 7.52858C10.7319 7.78892 10.7319 8.21103 10.4716 8.47138L6.47157 12.4714C6.21122 12.7317 5.78911 12.7317 5.52876 12.4714C5.26841 12.211 5.26841 11.7889 5.52876 11.5286L9.05735 7.99998L5.52876 4.47138C5.26841 4.21103 5.26841 3.78892 5.52876 3.52858Z"
		fill={color} />
</svg>
