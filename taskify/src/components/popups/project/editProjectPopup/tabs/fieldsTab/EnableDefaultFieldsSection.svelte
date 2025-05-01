<!-- This component lets you enable or disable the default-fields of a project. -->

<script lang="ts">
  import type {
    LocalProject,
    LocalProjectEnabledFields,
  } from "@components/types";
  import Checkbox from "@ui/Checkbox.svelte";

  let {
    project = $bindable(),
  }: {
    project: LocalProject;
  } = $props();

  function IsFieldEnabled(field: LocalProjectEnabledFields) {
    return project.enabledFields.includes(field);
  }

  function toggleIsFieldEnabled(field: LocalProjectEnabledFields) {
    if (IsFieldEnabled(field)) {
      project.enabledFields = project.enabledFields.filter(
        (element) => element !== field
      );
    } else {
      project.enabledFields.push(field);
    }
  }
</script>

<div>Enable/Disable standard fields:</div>
<div class="grid gap-2">
  <div class="mt-1 flex gap-2 items-center">
    <Checkbox
      onClick={() => toggleIsFieldEnabled("size")}
      value={IsFieldEnabled("size")}
    />
    Size
  </div>
  <div class="flex gap-2 items-center">
    <Checkbox
      onClick={() => toggleIsFieldEnabled("difficulty")}
      value={IsFieldEnabled("difficulty")}
    />
    Difficulty
  </div>
</div>
