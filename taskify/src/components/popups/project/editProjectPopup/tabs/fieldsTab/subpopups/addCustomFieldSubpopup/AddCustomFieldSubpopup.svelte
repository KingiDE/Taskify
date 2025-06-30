<!-- This subpoup lets you create a new custom fields inside a project. -->

<script lang="ts">
  import type {
    LocalProject,
    PossibleEditProjectFieldsSubpopups,
  } from "@components/types";
  import Button from "@ui/Button.svelte";
  import Input from "@ui/Input.svelte";
  import VariantBtn from "./VariantBtn.svelte";
  import { getVariantBoxPosition } from "src/utils/customFieldsInput";

  import {
    addCustomFieldInputs,
    addCustomFieldToProject,
    getInvalidInputs,
    updateInputsFieldsInSelectEffect,
  } from "@hooks/customFields/useAddCustomField.svelte";
  import Slider from "@ui/Slider.svelte";

  // biome-ignore lint/style/useConst: These are props and work like this
  let {
    project = $bindable(),
    subpopup = $bindable(),
  }: {
    project: LocalProject;
    subpopup: PossibleEditProjectFieldsSubpopups;
  } = $props();

  $effect(() => {
    updateInputsFieldsInSelectEffect();
  });

  const invalidInputs = $derived.by(getInvalidInputs);
</script>

<h1 class="font-poppins font-bold text-2xl justify-self-start">
  Create custom field
</h1>
<div class="mt-1 rounded-md grid gap-2">
  <Input
    label="Custom field name:"
    placeholder="Priority"
    getter={() => addCustomFieldInputs.value.name}
    setter={(newValue) => (addCustomFieldInputs.value.name = newValue)}
  />
  <div>
    <div>Variant:</div>
    <Slider
      widthOfSingleElement={96}
      indexOfSelectedElement={getVariantBoxPosition(
        addCustomFieldInputs.value.variant,
      )}
      extraCSS="mt-1"
    >
      {#snippet elements(_widthOfSingleElement)}
        <VariantBtn
          text="Number"
          variant="number"
          bind:inputVariant={addCustomFieldInputs.value.variant}
        />
        <VariantBtn
          text="Text"
          variant="text"
          bind:inputVariant={addCustomFieldInputs.value.variant}
        />
        <VariantBtn
          text="Checkbox"
          variant="checkbox"
          bind:inputVariant={addCustomFieldInputs.value.variant}
        />
        <VariantBtn
          text="Select"
          variant="select"
          bind:inputVariant={addCustomFieldInputs.value.variant}
        />
      {/snippet}
    </Slider>
  </div>
  {#if addCustomFieldInputs.value.variant === "select"}
    <div
      class={`${addCustomFieldInputs.value.variant === "select" ? "" : "opacity-50"} grid gap-1`}
    >
      {#each addCustomFieldInputs.value.options as option, index}
        <Input
          placeholder="Some option"
          getter={() => option}
          setter={(newValue) => {
            addCustomFieldInputs.value.options[index] = newValue;
          }}
          disabled={addCustomFieldInputs.value.variant !== "select"}
        />
      {/each}
    </div>
  {/if}
  <Button
    extraCSS="mt-2"
    meaning="positive"
    onClick={() => {
      addCustomFieldToProject(project);
      subpopup = null;
    }}
    disabled={invalidInputs}
  >
    {#snippet text()}
      Create
    {/snippet}
  </Button>
</div>
