<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { mergeClassNames } from '@tcf/lib/helpers/mergeClassNames';

	type Props = {
		onClick: () => void;
		isActive: boolean;
		label: string;
	};

	const { isActive, label, onClick }: Props = $props();

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'Space') {
			event.preventDefault();
		}
	};
	const bem = createBEM('pagination-button');
</script>

<button onclick={onClick} onkeydown={onKeyDown} class={mergeClassNames(bem('', { active: isActive }))} type="button" role="link" disabled={isActive}>
	<span>
		{label}
	</span>
</button>

<style lang="scss">
	.pagination-button {
		width: 32px;
		height: 32px;
		border-radius: 10px;

		&--active {
			background: #1e0c5b;
			color: #ffffff;
		}
	}
</style>
