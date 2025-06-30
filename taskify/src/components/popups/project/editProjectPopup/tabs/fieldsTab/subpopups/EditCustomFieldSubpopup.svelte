<!-- This subpoup lets you edit a existing custom field inside a project. -->

<script lang="ts">
  import type { LocalProjectCustomField } from "@components/types";
  import Input from "@ui/Input.svelte";
  import VariantBtn from "./addCustomFieldSubpopup/VariantBtn.svelte";
  import { getVariantBoxPosition } from "src/utils/customFieldsInput";
  import {
    editCustomFieldInputs,
    initializeInputs,
    updateInputsFieldsInSelectEffect,
  } from "@hooks/customFields/useEditCustomField.svelte.ts";
  import { onMount } from "svelte";
  import Slider from "@ui/Slider.svelte";

  const {
    currentCustomField = $bindable(),
  }: {
    currentCustomField: LocalProjectCustomField;
  } = $props();

  onMount(() => {
    initializeInputs(currentCustomField);
  });

  $effect(() => {
    currentCustomField.name = editCustomFieldInputs.value.name;
    currentCustomField.variant = editCustomFieldInputs.value.variant;
    currentCustomField.options =
      editCustomFieldInputs.value.variant === "select"
        ? editCustomFieldInputs.value.options.filter(
            (element) => element !== "",
          )
        : null;

    updateInputsFieldsInSelectEffect();
  });
</script>

<h1 class="font-poppins font-bold text-2xl justify-self-start">
  Edit custom field
</h1>
<div class="mt-1 rounded-md grid gap-2">
  <Input
    label="Custom field name:"
    placeholder="Priority"
    getter={() => editCustomFieldInputs.value.name}
    setter={(newValue) => (editCustomFieldInputs.value.name = newValue)}
  />
  <div>
    <div>Variant:</div>
    <Slider
      widthOfSingleElement={96}
      indexOfSelectedElement={getVariantBoxPosition(
        editCustomFieldInputs.value.variant,
      )}
      extraCSS="mt-1"
    >
      {#snippet elements(_widthOfSingleElement)}
        <VariantBtn
          text="Number"
          variant="number"
          bind:inputVariant={editCustomFieldInputs.value.variant}
        />
        <VariantBtn
          text="Text"
          variant="text"
          bind:inputVariant={editCustomFieldInputs.value.variant}
        />
        <VariantBtn
          text="Checkbox"
          variant="checkbox"
          bind:inputVariant={editCustomFieldInputs.value.variant}
        />
        <VariantBtn
          text="Select"
          variant="select"
          bind:inputVariant={editCustomFieldInputs.value.variant}
        />
      {/snippet}
    </Slider>
  </div>
  {#if editCustomFieldInputs.value.variant === "select"}
    <div
      class={`${editCustomFieldInputs.value.variant === "select" ? "" : "opacity-50"} grid gap-1`}
    >
      {#each editCustomFieldInputs.value.options as option, index}
        <Input
          placeholder="Some option"
          getter={() => option}
          setter={(newValue) => {
            editCustomFieldInputs.value.options[index] = newValue;
          }}
          disabled={editCustomFieldInputs.value.variant !== "select"}
        />
      {/each}
    </div>
  {/if}
</div>
