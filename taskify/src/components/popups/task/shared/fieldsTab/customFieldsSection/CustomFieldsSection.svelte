<!-- This component is the template for rendering the all variants of custom fields for a task. -->

<script lang="ts">
  import type { LocalProject, LocalProjectTask } from "@components/types";
  import Checkbox from "@ui/Checkbox.svelte";
  import Input from "@ui/Input.svelte";
  import SelectSection from "./SelectSection.svelte";

  let {
    task = $bindable(),
    currentProject,
  }: {
    task: Omit<LocalProjectTask, "id">;
    currentProject: LocalProject;
  } = $props();

  function getPossibleCustomField(id: string) {
    return task.customFields.find((element) => element.id === id);
  }

  function storeCustomFieldStringValueInLocalState(
    id: string,
    value: string | number | null,
    variant: "text" | "number" | "select"
  ) {
    const possibleExistingStoredElement = getPossibleCustomField(id);

    if (possibleExistingStoredElement) {
      possibleExistingStoredElement.value =
        value === null ? "" : value.toString();
    } else {
      task.customFields.push({
        id: id,
        value: value === null ? "" : value.toString(),
        variant,
      });
    }
  }

  function toggleCustomFieldBooleanValueInLocalState(id: string) {
    const possibleExistingStoredElement = getPossibleCustomField(id);

    possibleExistingStoredElement
      ? (possibleExistingStoredElement.value =
          !possibleExistingStoredElement.value)
      : task.customFields.push({
          id: id,
          value: true,
          variant: "checkbox",
        });
  }

  function getCustomFieldTextValue(id: string) {
    const possibleExistingStoredElement = getPossibleCustomField(id);

    if (
      possibleExistingStoredElement &&
      (possibleExistingStoredElement.variant === "text" ||
        possibleExistingStoredElement.variant === "number")
    ) {
      return possibleExistingStoredElement.value;
    } else {
      return "";
    }
  }

  function getCustomFieldBooleanValue(id: string) {
    const possibleExistingStoredElement = getPossibleCustomField(id);

    if (
      possibleExistingStoredElement &&
      possibleExistingStoredElement.variant === "checkbox"
    ) {
      return possibleExistingStoredElement.value;
    } else {
      return false;
    }
  }
</script>

{#each currentProject.customFields as customField}
  <div class="mt-2">
    {#if customField.variant === "number"}
      {customField.name}:
      <div class="mt-2">
        <Input
          placeholder="Number"
          type="number"
          getter={() => getCustomFieldTextValue(customField.id)}
          setter={(newValue) => {
            storeCustomFieldStringValueInLocalState(
              customField.id,
              newValue,
              "number"
            );
          }}
        />
      </div>
    {:else if customField.variant === "text"}
      {customField.name}:
      <div class="mt-2">
        <Input
          placeholder="Text"
          getter={() => getCustomFieldTextValue(customField.id)}
          setter={(newValue) => {
            storeCustomFieldStringValueInLocalState(
              customField.id,
              newValue,
              "text"
            );
          }}
        />
      </div>
    {:else if customField.variant === "checkbox"}
      {customField.name}:
      <div class="mt-2">
        <Checkbox
          value={getCustomFieldBooleanValue(customField.id)}
          onClick={() => {
            toggleCustomFieldBooleanValueInLocalState(customField.id);
          }}
        />
      </div>
    {:else if customField.variant === "select"}
      <SelectSection bind:task {customField} {currentProject} />
    {/if}
  </div>
{/each}
