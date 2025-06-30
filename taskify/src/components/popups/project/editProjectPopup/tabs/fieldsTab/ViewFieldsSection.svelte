<!-- This component lists all existing custom fields of a project. -->

<script lang="ts">
  import type {
    LocalProject,
    LocalProjectCustomField,
    PossibleEditProjectFieldsSubpopups,
  } from "@components/types";
  import Button from "@ui/Button.svelte";
  import Icon from "@ui/Icon.svelte";

  // biome-ignore lint/style/useConst: These are props and work like this
  let {
    project = $bindable(),
    currentCustomField = $bindable(),
    subpopup = $bindable(),
  }: {
    project: LocalProject;
    currentCustomField: LocalProjectCustomField | null;
    subpopup: PossibleEditProjectFieldsSubpopups;
  } = $props();

  function convertVariantToPretty(
    variant: "number" | "text" | "select" | "checkbox",
    options: string[] | null,
  ) {
    switch (variant) {
      case "number":
        return "Number";
      case "text":
        return "Text";
      case "select":
        return `Select (${options?.length ? options.length : 0}) options`;
      case "checkbox":
        return "Checkbox";
    }
  }
</script>

<div class="mt-2">Modify custom fields:</div>
<div class="mt-1 grid gap-1">
  {#each project.customFields as customField}
    <div class="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-700">
      <div class="w-[120px]">{customField.name}</div>
      <div class="opacity-50">
        {convertVariantToPretty(customField.variant, customField.options)}
      </div>
      <Button
        meaning="positive"
        extraRules={["no-padding"]}
        extraCSS="ml-auto p-1"
        onClick={() => {
          customField.isVisible = !customField.isVisible;
        }}
      >
        {#snippet icon()}
          <div
            class={`${customField.isVisible ? "" : "opacity-50"} transition-[opacity]`}
          >
            <Icon name="visible" variant="rounded" width={24} height={24} />
          </div>
        {/snippet}
      </Button>
      <Button
        meaning="positive"
        extraRules={["no-padding"]}
        extraCSS="p-1"
        onClick={() => {
          currentCustomField = customField;
          subpopup = "edit_field";
        }}
      >
        {#snippet icon()}
          <Icon name="edit" variant="rounded" width={24} height={24} />
        {/snippet}
      </Button>
      <Button
        meaning="negative"
        extraRules={["no-padding"]}
        extraCSS="p-1"
        onClick={() => {
          currentCustomField = customField;
          subpopup = "delete_field";
        }}
      >
        {#snippet icon()}
          <Icon name="delete" variant="rounded" width={24} height={24} />
        {/snippet}
      </Button>
    </div>
  {/each}
</div>
<Button
  meaning="neutral"
  onClick={() => (subpopup = "add_field")}
  extraCSS="mt-1 w-full justify-center"
>
  {#snippet text()}
    Add custom field
  {/snippet}
  {#snippet icon()}
    <Icon name="add" width={24} height={24} variant="rounded" />
  {/snippet}
</Button>
