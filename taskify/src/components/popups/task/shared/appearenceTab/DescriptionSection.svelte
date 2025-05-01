<!-- This component lets you edit the description of a task. -->

<script lang="ts">
  import type { LocalProjectTask } from "@components/types";
  import Textarea from "@ui/Textarea.svelte";

  let {
    task = $bindable(),
  }: {
    task: Omit<LocalProjectTask, "id">;
  } = $props();
</script>

<Textarea
  label="Description:"
  labelExtraCSS="mt-2 block"
  getter={() => task.description}
  setter={(newValue) => {
    task.description = newValue;
  }}
  placeholder="Leave out the extra part at the end"
/>
