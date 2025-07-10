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
		d="M10.4716 3.52858C10.7319 3.78892 10.7319 4.21103 10.4716 4.47138L6.94297 7.99998L10.4716 11.5286C10.7319 11.7889 10.7319 12.211 10.4716 12.4714C10.2112 12.7317 9.78911 12.7317 9.52876 12.4714L5.52876 8.47138C5.26841 8.21103 5.26841 7.78892 5.52876 7.52858L9.52876 3.52858C9.78911 3.26823 10.2112 3.26823 10.4716 3.52858Z"
		fill={color} />
</svg>
