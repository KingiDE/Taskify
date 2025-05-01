<!-- This component lets you toggle the checked-status of a task directly in the table. -->

<script lang="ts">
  import type { LocalProjectTask } from "@components/types";
  import Checkbox from "@ui/Checkbox.svelte";

  let {
    task = $bindable(),
    selectCurrentTask,
    toggleIsCheckedOnCurrentTask,
  }: {
    task: LocalProjectTask;
    selectCurrentTask: (task: LocalProjectTask) => void;
    toggleIsCheckedOnCurrentTask: () => void;
  } = $props();
</script>

<td class="border-gray-500">
  <Checkbox
    onClick={() => {
      selectCurrentTask(task);
      toggleIsCheckedOnCurrentTask();
    }}
    value={task.isChecked}
    extraCSS="justify-center"
  />
</td>
