<!-- This component lets you edit the "size" field of a task. -->

<script lang="ts">
  import type { LocalProjectTask } from "@components/types";
  import Button from "@ui/Button.svelte";
  import Slider from "@ui/Slider.svelte";

  const {
    task = $bindable(),
  }: {
    task: Omit<LocalProjectTask, "id">;
  } = $props();
</script>

<div class="mt-2">
  Size:
  <Slider
    extraCSS="mt-2 justify-self-start"
    indexOfSelectedElement={task.size === "small"
      ? 0
      : task.size === "medium"
        ? 1
        : 2}
    widthOfSingleElement={108}
  >
    {#snippet elements()}
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
    {/snippet}
  </Slider>
</div>
