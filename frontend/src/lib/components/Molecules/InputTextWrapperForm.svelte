<script lang="ts">
	import FormError from '@tcf/lib/components/Atoms/FormError.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import type { FullAutoFill } from 'svelte/elements';

	interface Props {
		inputId: string;
		name: string;
		label: string;
		placeholder: string;
		bindedValue: string;
		bindedError: any;
		autocomplete?: FullAutoFill;
	}

	let { bindedValue = $bindable(''), bindedError, label, inputId, name, placeholder, autocomplete }: Props = $props();
	const bem = createBEM('input-wrapper-form');
</script>

<div class={bem()}>
	<label class={bem('label')} for={inputId}>{label}</label>
	<input
		class={bem('input')}
		bind:value={bindedValue}
		class:error={!!bindedError}
		id={inputId}
		{name}
		{placeholder}
		{autocomplete}
		aria-invalid={!!bindedError} />
	<FormError errors={bindedError} />
</div>
