<!-- This component lets you delete a project. -->

<script lang="ts">
  import type { PossiblePopups } from "@components/types";
  import Button from "@ui/Button.svelte";
  import Icon from "@ui/Icon.svelte";
  import { fade } from "svelte/transition";

  let {
    popup = $bindable(),
    deleteCurrentSelectedProject,
  }: {
    popup: PossiblePopups;
    deleteCurrentSelectedProject: () => void;
  } = $props();

  let hasTriedToDelete = $state(false);

  function deleteProject() {
    deleteCurrentSelectedProject();
    popup = null;
  }
</script>

<div
  class="p-2 rounded-md bg-orange-500/50 -outline-offset-1 outline-1 outline-orange-500"
>
  <div class="font-bold">Warning:</div>
  This is a destructive action! Unexpected things will happen if you don't read this
  carefully. This process is not reversible!
</div>
<div class="mt-4">Delete this project:</div>
<div class="mt-1 flex gap-4">
  <Button
    extraCSS="py-2 px-4"
    extraRules={["no-padding"]}
    meaning="negative"
    onClick={() => {
      hasTriedToDelete = true;
    }}
  >
    {#snippet icon()}
      <Icon height={24} width={24} name="delete" variant="rounded" />
    {/snippet}
    {#snippet text()}
      Delete project
    {/snippet}
  </Button>
  {#if hasTriedToDelete}
    <div transition:fade={{ duration: 100 }}>
      <Button
        onClick={deleteCurrentSelectedProject}
        meaning="negative"
        extraCSS="mt-2 px-4"
      >
        {#snippet text()}
          REALLY delete?
        {/snippet}
      </Button>
    </div>
  {/if}
</div>
