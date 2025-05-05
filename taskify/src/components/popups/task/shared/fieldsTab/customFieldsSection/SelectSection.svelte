<!-- This component is the template for rendering the "select"-variant custom field of a task. -->

<script lang="ts">
import type { LocalProject, LocalProjectTask } from "@components/types";
import Button from "@ui/Button.svelte";
import { fade } from "svelte/transition";

const {
	customField,
	task = $bindable(),
	currentProject,
}: {
	customField: {
		id: string;
		name: string;
		variant: "select";
		options: Array<string>;
	};
	task: Omit<LocalProjectTask, "id">;
	currentProject: LocalProject;
} = $props();

// The possible current value that is stored in the task for this custom field
const currentValue = $derived.by(() => {
	return task.customFields.find((element) => element.id === customField.id);
});

$effect(() => {
	const possibleExistingOptions = currentProject.customFields.find(
		(element) => element.id === customField.id,
	);

	// If the current value is one that isn't possible, it will get set to null
	if (
		currentValue?.value &&
		possibleExistingOptions &&
		possibleExistingOptions.options &&
		!possibleExistingOptions.options.includes(currentValue.value.toString())
	) {
		currentValue.value = null;
	}
});

// biome-ignore lint/style/useConst: <explanation>
let showOptions = $state(false);

function changeSelectedOptionTo(option: string) {
	if (currentValue === undefined) {
		task.customFields.push({
			id: customField.id,
			variant: "select",
			value: option,
		});
	} else {
		currentValue.value = option;
	}
}
</script>

{customField.name}:
<div class="relative mt-2">
  <Button
    onClick={() => (showOptions = !showOptions)}
    meaning="neutral"
    extraRules={["no-padding", "no-outline"]}
    extraCSS="py-1 px-2 text-start"
  >
    {#snippet text()}
      <div
        class={`${currentValue === undefined || currentValue.value === null ? "opacity-50" : ""}`}
      >
        {currentValue === undefined || currentValue.value === null
          ? "Unset"
          : currentValue.value}
      </div>
    {/snippet}
  </Button>
  {#if showOptions}
    <div
      transition:fade={{ duration: 100 }}
      class="z-10 bg-gray-800 rounded-md outline-1 outline-gray-500 grid p-1 absolute top-[calc(100%_+_8px)] left-0.5"
    >
      {#if customField.options.length === 0}
        <div class="py-1 px-2">There don't exist any options.</div>
      {/if}
      {#each customField.options as option}
        <Button
          onClick={() => {
            changeSelectedOptionTo(option);
            showOptions = false;
          }}
          meaning="neutral"
          extraRules={["no-padding", "no-outline"]}
          extraCSS="py-1 px-2 text-start"
        >
          {#snippet text()}
            {option}
          {/snippet}
        </Button>
      {/each}
    </div>
  {/if}
</div>
