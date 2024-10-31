<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import {
        CheckCircle,
        ExclamationTriangle,
        Icon,
        InformationCircle,
        XCircle,
        XMark,
    } from 'svelte-hero-icons';
    import { fly } from 'svelte/transition';

    const dispatch = createEventDispatcher();

    const iconMapping = {
        info: InformationCircle,
        success: CheckCircle,
        warning: ExclamationTriangle,
        error: XCircle,
    } as const;

    export let type: keyof typeof iconMapping;
    export let closable = true;

    $: icon = iconMapping[type];
</script>

<div aria-label="toast" class="toast toast-{type}" transition:fly>
    <Icon class="toast-icon" src={icon} size="24" solid />
    <span class="slot">
        <slot />
    </span>
    {#if closable}
        <button class="close" on:click={() => dispatch('close')}>
            <Icon src={XMark} size="14" />
        </button>
    {/if}
</div>
