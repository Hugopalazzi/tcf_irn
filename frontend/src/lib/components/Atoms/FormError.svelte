<script lang="ts">
    export let errors: string[] | string | null | undefined | any;
</script>
{#if errors}
   <span class="error-message">{Array.isArray(errors) ? errors[0] : errors}</span>
{/if}
