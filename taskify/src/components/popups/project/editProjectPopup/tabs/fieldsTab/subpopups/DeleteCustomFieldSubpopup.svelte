<!-- This subpoup lets you delete a existing custom field inside a project. -->

<script lang="ts">
  import type {
    LocalProject,
    LocalProjectCustomField,
    PossibleEditProjectFieldsSubpopups,
  } from "@components/types";
  import Button from "@ui/Button.svelte";
  import Icon from "@ui/Icon.svelte";
  import { fade } from "svelte/transition";

  let {
    project = $bindable(),
    currentCustomField = $bindable(),
    subpopup = $bindable(),
  }: {
    project: LocalProject;
    currentCustomField: LocalProjectCustomField | null;
    subpopup: PossibleEditProjectFieldsSubpopups;
  } = $props();

  let hasTriedToDelete = $state(false);

  function deleteCustomField() {
    project.customFields = project.customFields.filter(
      (customField) => currentCustomField?.id !== customField.id,
    );

    // Remove all stored values in tasks for this custom field
    for (const task of project.tasks) {
      task.customFields = task.customFields.filter(
        (element) => element.id !== currentCustomField?.id,
      );
    }

    currentCustomField = null;
    subpopup = null;
  }
</script>

<div class="max-w-[575px] grid">
  <h1 class="font-poppins font-bold text-2xl">Delete this custom field</h1>
  <div
    class="mt-4 p-2 rounded-md bg-orange-500/50 outline-1 outline-orange-500"
  >
    <div class="font-bold">Warning:</div>
    This is a destructive action! Unexpected things will happen if you don't read
    this carefully. This process is not reversible!
  </div>
  <div class="mt-4">Delete this custom field:</div>
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
        Delete custom field
      {/snippet}
    </Button>
    {#if hasTriedToDelete}
      <div transition:fade={{ duration: 100 }}>
        <Button onClick={deleteCustomField} meaning="negative" extraCSS="px-4">
          {#snippet text()}
            REALLY delete?
          {/snippet}
        </Button>
      </div>
    {/if}
  </div>
</div>
