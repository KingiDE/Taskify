<!-- This component lets you edit the checked-status of a task. -->

<script lang="ts">
  import type { LocalProjectTask } from "@components/types";
  import Checkbox from "@ui/Checkbox.svelte";

  let {
    task = $bindable(),
  }: {
    task: Omit<LocalProjectTask, "id">;
  } = $props();
</script>

<Checkbox
  label="Checked"
  onClick={() => {
    task.isChecked = !task.isChecked;
  }}
  value={task.isChecked}
  extraCSS="mt-2"
/>
