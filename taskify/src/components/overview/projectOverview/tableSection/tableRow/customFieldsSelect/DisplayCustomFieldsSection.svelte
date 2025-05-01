<script lang="ts">
  import type {
    LocalProjectCustomField,
    LocalProjectTask,
    TaskCheckboxVariantCustomField,
    TaskSelectVariantCustomField,
    TaskTextOrNumberVariantCustomField,
  } from "@components/types";
  import TextOrNumberFieldSelect from "./TextOrNumberFieldSelect.svelte";
  import SelectFieldSelect from "./SelectFieldSelect.svelte";
  import CheckboxFieldSelect from "./CheckboxFieldSelect.svelte";

  let {
    task = $bindable(),
    customDeclaredField,
    possibleCustomDataField,
  }: {
    task: LocalProjectTask;
    customDeclaredField: LocalProjectCustomField;
    possibleCustomDataField:
      | TaskCheckboxVariantCustomField
      | TaskSelectVariantCustomField
      | TaskTextOrNumberVariantCustomField
      | undefined;
  } = $props();
</script>

{#if possibleCustomDataField}
  {#if possibleCustomDataField.variant === "text" || possibleCustomDataField.variant === "number"}
    <TextOrNumberFieldSelect bind:customField={possibleCustomDataField} />
  {:else if possibleCustomDataField.variant === "checkbox"}
    <CheckboxFieldSelect bind:customField={possibleCustomDataField} />
  {:else if possibleCustomDataField.variant === "select"}
    <SelectFieldSelect
      {task}
      possibleOptions={customDeclaredField.options}
      bind:customField={possibleCustomDataField}
    />
  {/if}
{/if}
