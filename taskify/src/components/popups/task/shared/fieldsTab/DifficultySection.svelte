<!-- This component lets you edit the "difficulty" field of a task. -->

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
  Difficulty:
  <Slider
    extraCSS="mt-2 justify-self-start"
    indexOfSelectedElement={task.difficulty === "easy"
      ? 0
      : task.difficulty === "medium"
        ? 1
        : 2}
    widthOfSingleElement={108}
    >{#snippet elements()}
      <Button
        meaning="discrete-neutral"
        onClick={() => (task.difficulty = "easy")}
        extraRules={["no-padding"]}
        extraCSS="px-2 py-1 flex-none w-[108px]"
      >
        {#snippet text()}
          🧨 Easy
        {/snippet}
      </Button>
      <Button
        meaning="discrete-neutral"
        onClick={() => (task.difficulty = "medium")}
        extraRules={["no-padding"]}
        extraCSS="px-2 py-1 flex-none w-[108px]"
      >
        {#snippet text()}
          💣 Medium
        {/snippet}
      </Button>
      <Button
        meaning="discrete-neutral"
        onClick={() => (task.difficulty = "hard")}
        extraRules={["no-padding"]}
        extraCSS="px-2 py-1 flex-none w-[108px]"
      >
        {#snippet text()}
          ☢️ Hard
        {/snippet}
      </Button>
    {/snippet}
  </Slider>
</div>
