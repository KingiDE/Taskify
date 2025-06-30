<script lang="ts">
  import type { PossiblePopups } from "@components/types";
  import Button from "@ui/Button.svelte";
  import Icon from "@ui/Icon.svelte";

  // biome-ignore lint/style/useConst: These are props and work like this
  let {
    isSidebarExpanded,
    popup = $bindable(),
  }: {
    isSidebarExpanded: boolean;
    popup: PossiblePopups;
  } = $props();
</script>

<Button
  meaning="neutral"
  onClick={() => {
    popup = "settings";
  }}
  extraCSS="mt-auto"
>
  {#snippet icon()}
    <Icon
      extraCSS="flex-none"
      name="settings"
      variant="rounded"
      width={24}
      height={24}
    />
  {/snippet}
  {#snippet text()}
    <div
      class={`transition-[opacity] ${isSidebarExpanded ? "opacity-100 delay-100" : "opacity-0"}`}
    >
      Settings
    </div>
  {/snippet}
</Button>
