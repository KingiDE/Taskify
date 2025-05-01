<script lang="ts">
  import { fade } from "svelte/transition";
  import Button from "./ui/Button.svelte";
  import Icon from "./ui/Icon.svelte";

  let {
    popup = $bindable(),
    innerPopup,
    onClose,
    maxWidth,
  }: {
    innerPopup: () => any;
    popup: string | null;
    onClose?: () => void;
    maxWidth: string;
  } = $props();
</script>

<!-- A popup-template that is renderd as soon as the passed popup value isn't null.
The popup value is set to null when the Escape key is pressed or the 'X'-button is clicked.  -->
{#if popup != null}
  <div
    transition:fade={{ duration: 100 }}
    class={`w-[calc(100vw_-_32px)] ${maxWidth} max-h-[calc(100%_-_16px)] grid justify-items-center z-10 shadow-lg bg-gray-800 fixed left-1/2 top-1/2 -translate-1/2 outline-1 outline-gray-500 rounded-md p-4 overflow-y-scroll`}
    role="button"
  >
    <Button
      meaning="neutral"
      onClick={() => {
        popup = null;
        if (onClose) {
          onClose();
        }
      }}
      extraCSS="absolute top-4 right-4 "
    >
      {#snippet icon()}
        <Icon name="close" variant="rounded" width={24} height={24} />
      {/snippet}
    </Button>
    {@render innerPopup()}
  </div>
{/if}
