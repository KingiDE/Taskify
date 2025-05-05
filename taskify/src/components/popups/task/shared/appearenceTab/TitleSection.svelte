<!-- This component lets you edit the title of a task. -->

<script lang="ts">
import type { LocalProjectTask } from "@components/types";
import Input from "@ui/Input.svelte";

const {
	task = $bindable(),
}: {
	task: Omit<LocalProjectTask, "id">;
} = $props();
</script>

<Input
  labelExtraCSS="mt-4"
  label="Title:"
  placeholder="Go for a walk with Rex"
  getter={() => task.title}
  setter={(newValue) => {
    task.title = newValue;
  }}
/>
