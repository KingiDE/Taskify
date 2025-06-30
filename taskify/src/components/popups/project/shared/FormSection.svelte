<!-- This component wraps the section to edit the title and description of a project. -->

<script lang="ts">
  import type { LocalProject } from "@components/types";
  import Input from "@ui/Input.svelte";
  import Textarea from "@ui/Textarea.svelte";

  const {
    project = $bindable(),
  }: {
    project: Omit<LocalProject, "id">;
  } = $props();
</script>

<Input
  label="Name:"
  labelExtraCSS="mt-4"
  getter={() => project.name}
  setter={(newValue) => {
    project.name = newValue;
  }}
  placeholder="My new project"
/>
<Textarea
  label="Description:"
  labelExtraCSS="mt-2 block"
  getter={() => project.description}
  setter={(newValue) => {
    project.description = newValue;
  }}
  placeholder="A very informative project description"
/>
