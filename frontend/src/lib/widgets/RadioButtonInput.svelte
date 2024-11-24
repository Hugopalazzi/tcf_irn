<script lang="ts" generics="T extends Record<string, unknown>, OptionType extends unknown">
    import { formFieldProxy, type FormPathLeaves, type SuperForm } from 'sveltekit-superforms';
    import FormError from '$lib/FormError.svelte';

    type Key = keyof OptionType | ((o: OptionType) => string) | undefined;

    interface Props {
        form: SuperForm<T>;
        field: FormPathLeaves<T>;
        label?: string;
        disabled?: boolean;
        options: OptionType[];
        optionValueKey?: Key;
        optionLabelKey?: Key;
        hint?: string;
        onRadioChange?: (val: typeof $value) => void;
    }

    let {
        form,
        field,
        label = '',
        disabled = false,
        options,
        optionValueKey = undefined,
        optionLabelKey = $bindable(undefined),
        hint = '',
        onRadioChange
    }: Props = $props();

    const { value, errors } = formFieldProxy(form, field);
    let ariaDescribedby = $derived(!$errors ? null : field + '_error');

    if (!optionLabelKey) {
        optionLabelKey = optionValueKey;
    }

    function getValueByOptionAndKey(
        option: OptionType,
        key: keyof OptionType | undefined | ((o: OptionType) => string)
    ): string {
        if (key === undefined) {
            return `${option}`;
        }
        if (typeof key === 'function') {
            return key(option);
        }
        return `${option[key]}`;
    }
</script>

<div class="input-wrapper radios">
    <span class="label">{label}</span>
    <div class="options">
        {#each options as option, index}
            <div class="radio">
                <label for="{field}{index}">
                    <input
                        type="radio"
                        id="{field}{index}"
                        name={field}
                        value={getValueByOptionAndKey(option, optionValueKey)}
                        bind:group={$value}
                        onchange={() => onRadioChange?.($value)}
                        aria-describedby={ariaDescribedby}
                        tabindex={index}
                        {disabled} />
                    <span>{getValueByOptionAndKey(option, optionLabelKey)}</span>
                </label>
            </div>
        {/each}
    </div>
    {#if hint}
        <p class="input-wrapper__hint">
            {hint}
        </p>
    {/if}
    <FormError errors={$errors} id={ariaDescribedby} />
</div>
