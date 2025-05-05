<!-- This component lets you select the value of the size-field directly in the table . -->

<script lang="ts">
import type { LocalProjectTask } from "@components/types";
import Button from "@ui/Button.svelte";
import { fade } from "svelte/transition";

const {
	task = $bindable(),
}: {
	task: LocalProjectTask;
} = $props();

// biome-ignore lint/style/useConst: <explanation>
let showOptions = $state(false);

function mapStateToPrettyValue() {
	switch (task.size) {
		case "small":
			return "🟢 Small";
		case "medium":
			return "🟡 Medium";
		case "large":
			return "🔴 Large";
	}
}
</script>

<td class="border-gray-500 relative text-center whitespace-nowrap">
  <Button
    onClick={() => (showOptions = !showOptions)}
    meaning="neutral"
    extraRules={["no-padding", "no-outline"]}
    extraCSS={`py-1 px-2 text-start group-hover:bg-gray-700 ${showOptions ? "bg-gray-500" : ""}`}
  >
    {#snippet text()}
      {@html mapStateToPrettyValue()}
    {/snippet}
  </Button>
  {#if showOptions}
    <div
      transition:fade={{ duration: 100 }}
      class="z-10 bg-gray-800 rounded-md outline-1 outline-gray-500 grid gap-1 p-1 absolute top-0 left-0 min-w-full min-h-full"
    >
      <Button
        onClick={() => {
          task.size = "small";
          showOptions = false;
        }}
        meaning="neutral"
        extraRules={["no-padding", "no-outline", "no-bg"]}
        extraCSS={`py-1 px-2 text-start hover:bg-gray-500 ${task.size === "small" ? "bg-gray-500" : ""}`}
      >
        {#snippet text()}
          🟢 Small
        {/snippet}
      </Button>
      <Button
        onClick={() => {
          task.size = "medium";
          showOptions = false;
        }}
        meaning="neutral"
        extraRules={["no-padding", "no-outline", "no-bg"]}
        extraCSS={`py-1 px-2 text-start hover:bg-gray-500 ${task.size === "medium" ? "bg-gray-500" : ""}`}
      >
        {#snippet text()}
          🟡 Medium
        {/snippet}
      </Button>
      <Button
        onClick={() => {
          task.size = "large";
          showOptions = false;
        }}
        meaning="neutral"
        extraRules={["no-padding", "no-outline", "no-bg"]}
        extraCSS={`py-1 px-2 text-start hover:bg-gray-500 ${task.size === "large" ? "bg-gray-500" : ""}`}
      >
        {#snippet text()}
          🔴 Large
        {/snippet}
      </Button>
    </div>
  {/if}
</td>
