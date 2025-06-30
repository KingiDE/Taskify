<!-- This component lets you select the value of the any custom field of the variant "select" directly in the table . -->

<script lang="ts">
  import type { LocalProjectTask } from "@components/types";
  import Button from "@ui/Button.svelte";
  import { fade } from "svelte/transition";

  const {
    task = $bindable(),
    possibleOptions,
    customField = $bindable(),
  }: {
    task: LocalProjectTask;
    possibleOptions: Array<string> | null;
    customField: {
      id: string;
      variant: "select";
      value: string | null;
    };
  } = $props();

  // biome-ignore lint/style/useConst: <explanation>
  let showOptions = $state(false);

  // The possible current value that is stored in the task for this custom field
  const currentValue = $derived.by(() => {
    return task.customFields.find((element) => element.id === customField.id);
  });

  $effect(() => {
    // If the current value is one that isn't possible, it will get set to null
    if (
      currentValue?.value &&
      possibleOptions &&
      !possibleOptions.includes(currentValue.value.toString())
    ) {
      currentValue.value = null;
    }
  });
</script>

<td class="min-w-[125px] border-gray-500 relative text-center text-nowrap">
  <Button
    onClick={() => {
      showOptions = !showOptions;
    }}
    meaning="neutral"
    extraRules={["no-padding", "no-outline"]}
    extraCSS={`py-1 px-2 text-start group-hover:bg-gray-700 ${showOptions ? "bg-gray-700" : ""}`}
  >
    {#snippet text()}
      <div class={`${customField.value === null ? "opacity-50" : ""}`}>
        {customField.value !== null ? customField.value : "Unset"}
      </div>
    {/snippet}
  </Button>
  {#if showOptions && possibleOptions}
    <div
      transition:fade={{ duration: 100 }}
      class={`z-10 bg-gray-800 rounded-md outline-1 outline-gray-500 grid gap-1 p-1 absolute top-0 left-0 min-w-full min-h-full`}
    >
      {#if possibleOptions.length === 0}
        <div class="py-1 px-2">There don't exist any options.</div>
      {/if}
      {#each possibleOptions as option}
        <Button
          onClick={() => {
            customField.value = option;
            showOptions = false;
          }}
          meaning="neutral"
          extraRules={["no-padding", "no-outline", "overflow-visible", "no-bg"]}
          extraCSS={`py-1 px-2 text-start hover:bg-gray-500 ${customField.value === option ? "bg-gray-500" : ""} text-nowrap`}
        >
          {#snippet text()}
            {option}
          {/snippet}
        </Button>
      {/each}
    </div>
  {/if}
</td>
