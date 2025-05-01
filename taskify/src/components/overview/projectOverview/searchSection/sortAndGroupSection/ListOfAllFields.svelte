<script lang="ts">
  import type {
    LocalProjectCustomField,
    PossibleSearchSubpopups,
  } from "@components/types";
  import Button from "@ui/Button.svelte";
  import Icon from "@ui/Icon.svelte";
  import { firstCapital } from "src/utils/stringUtils";
  import { fade } from "svelte/transition";

  let {
    customFields,
    valueToUpdate = $bindable(),
    subpopup = $bindable(),
    showUnsetBtn,
  }: {
    customFields: Array<LocalProjectCustomField>;
    valueToUpdate: string | null;
    subpopup: PossibleSearchSubpopups;
    showUnsetBtn?: boolean;
  } = $props();
</script>

<div
  transition:fade={{ duration: 100 }}
  class="z-10 bg-gray-800 rounded-md outline-1 outline-gray-500 grid p-1 absolute top-[calc(100%_+_8px)] left-0 min-w-[120px]"
>
  {#if showUnsetBtn}
    <Button
      onClick={() => {
        valueToUpdate = null;
        subpopup = null;
      }}
      meaning="neutral"
      extraRules={["no-padding", "no-outline", "overflow-visible"]}
      extraCSS="py-1 pl-2 pr-10 text-start relative opacity-50"
    >
      {#snippet text()}
        Unset
        {#if valueToUpdate === null}
          <Icon
            width={24}
            height={24}
            name="checked"
            variant="rounded"
            extraCSS="absolute right-2 top-1"
          />
        {/if}
      {/snippet}
    </Button>
  {/if}
  {#each ["title", "description", "difficulty", "size", "done", "relations"] as prebuiltField}
    <Button
      onClick={() => {
        valueToUpdate = prebuiltField;
        subpopup = null;
      }}
      meaning="neutral"
      extraRules={["no-padding", "no-outline", "overflow-visible"]}
      extraCSS="py-1 pl-2 pr-10 text-start relative"
    >
      {#snippet text()}
        {firstCapital(prebuiltField)}
        {#if valueToUpdate === prebuiltField}
          <Icon
            width={24}
            height={24}
            name="checked"
            variant="rounded"
            extraCSS="absolute right-2 top-1"
          />
        {/if}
      {/snippet}
    </Button>
  {/each}
  {#each customFields as customField}
    <Button
      onClick={() => {
        valueToUpdate = customField.id;
        subpopup = null;
      }}
      meaning="neutral"
      extraRules={["no-padding", "no-outline", "overflow-visible"]}
      extraCSS="py-1 pl-2 pr-10 text-start relative text-nowrap"
    >
      {#snippet text()}
        {customField.name}
        {#if valueToUpdate === customField.id}
          <Icon
            width={24}
            height={24}
            name="checked"
            variant="rounded"
            extraCSS="absolute right-2 top-1"
          />
        {/if}
      {/snippet}
    </Button>
  {/each}
</div>
