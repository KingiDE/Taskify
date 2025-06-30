<!-- The component that is shown when switching to the destructive-tab while editing a task or clicking the delete-button
on a rendered task in the table. -->

<script lang="ts">
  import type { PossiblePopups } from "@components/types";
  import Button from "@ui/Button.svelte";
  import Icon from "@ui/Icon.svelte";

  // biome-ignore lint/style/useConst: These are props and work like this
  let {
    popup = $bindable(),
    deleteTaskWithCurrentId,
  }: {
    popup: PossiblePopups;
    deleteTaskWithCurrentId: () => void;
  } = $props();
</script>

<div
  class="p-2 rounded-md bg-orange-500/50 outline-1 -outline-offset-1 outline-orange-500"
>
  <div class="font-bold">Warning:</div>
  This is a destructive action! Unexpected things will happen if you don't read this
  carefully. This process is not reversible!
</div>
<div class="mt-4">Delete this task:</div>
<div class="mt-1 flex gap-2">
  <Button
    extraCSS="py-2 px-4"
    extraRules={["no-padding"]}
    meaning="negative"
    onClick={() => {
      deleteTaskWithCurrentId();
      popup = null;
    }}
  >
    {#snippet icon()}
      <Icon height={24} width={24} name="delete" variant="rounded" />
    {/snippet}
    {#snippet text()}
      Delete task
    {/snippet}
  </Button>
</div>
