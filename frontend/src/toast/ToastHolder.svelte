<script lang="ts">
    import { beforeNavigate } from '$app/navigation';
    import { onDestroy, onMount } from 'svelte';
    import Toast from './Toast.svelte';
    import { toasts, removeToast, removeAllToasts, removeExpiredToasts } from './toast.service';
    import { ArrowRight, Icon } from 'svelte-hero-icons';

    beforeNavigate(() => removeAllToasts());

    let interval: number;
    onMount(() => {
        interval = +setInterval(() => removeExpiredToasts(), 1000);
    });

    onDestroy(() => {
        removeAllToasts();
        clearInterval(interval);
    });
</script>

{#each $toasts as toast (toast.id)}
    <Toast type={toast.type} on:close={() => removeToast(toast.id)}>
        <span>{toast.message}</span>
        {#if toast.link && toast.linkMessage}
            <a href={toast.link}>
                {toast.linkMessage}
                <Icon src={ArrowRight} size="14" />
            </a>
        {/if}
    </Toast>
{/each}
