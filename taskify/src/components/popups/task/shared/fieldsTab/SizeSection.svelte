<!-- This component lets you edit the "size" field of a task. -->

<script lang="ts">
import type { LocalProjectTask } from "@components/types";
import Button from "@ui/Button.svelte";

const {
	task = $bindable(),
}: {
	task: Omit<LocalProjectTask, "id">;
} = $props();
</script>

<div class="mt-2">
  Size:
  <div class="mt-2 isolate relative flex gap-2">
    <div
      class={`-z-10 w-[108px] h-8 absolute rounded-md bg-gray-500 transition-[left] ${task.size === "small" ? "left-0" : task.size === "medium" ? "left-[116px]" : "left-[232px]"}`}
    ></div>
    <Button
      meaning="discrete-neutral"
      onClick={() => (task.size = "small")}
      extraRules={["no-padding"]}
      extraCSS="px-2 py-1 flex-none w-[108px]"
    >
      {#snippet text()}
        🟢 Small
      {/snippet}
    </Button>
    <Button
      meaning="discrete-neutral"
      onClick={() => (task.size = "medium")}
      extraRules={["no-padding"]}
      extraCSS="px-2 py-1 flex-none w-[108px]"
    >
      {#snippet text()}
        🟡 Medium
      {/snippet}
    </Button>
    <Button
      meaning="discrete-neutral"
      onClick={() => (task.size = "large")}
      extraRules={["no-padding"]}
      extraCSS="px-2 py-1 flex-none w-[108px]"
    >
      {#snippet text()}
        🔴 Large
      {/snippet}
    </Button>
  </div>
</div>
