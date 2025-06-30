<!-- This component wraps the components for one table row. -->

<script lang="ts">
  import type { LocalProject, LocalProjectTask } from "@components/types";
  import CheckedBtn from "./CheckedBtn.svelte";
  import DeleteBtn from "./DeleteBtn.svelte";
  import DisplayCustomFieldsSection from "./customFieldsSelect/DisplayCustomFieldsSection.svelte";
  import DifficultySelect from "./predefinedFieldsSelect/DifficultySelect.svelte";
  import SizeSelect from "./predefinedFieldsSelect/SizeSelect.svelte";

  let {
    task = $bindable(),
    selectCurrentTask,
    wantToEditTask,
    toggleIsCheckedOnCurrentTask,
    wantToDeleteTask,
    currentProject,
  }: {
    task: LocalProjectTask;
    selectCurrentTask: (task: LocalProjectTask) => void;
    wantToEditTask: () => void;
    toggleIsCheckedOnCurrentTask: () => void;
    wantToDeleteTask: () => void;
    currentProject: LocalProject;
  } = $props();
</script>

<tr
  class="transition-[background] group hover:bg-gray-700 cursor-pointer"
  onclick={() => selectCurrentTask(task)}
>
  <td class="border-gray-500 max-w-[200px]" onclick={wantToEditTask}
    >{task.title}</td
  >
  <td class="border-gray-500" onclick={wantToEditTask}>{task.description}</td>
  {#if currentProject.enabledFields.includes("difficulty")}
    <DifficultySelect bind:task />
  {/if}
  {#if currentProject.enabledFields.includes("size")}
    <SizeSelect bind:task />
  {/if}
  {#each currentProject.customFields as customDeclaredField}
    {#if customDeclaredField.isVisible}
      <DisplayCustomFieldsSection
        {task}
        {customDeclaredField}
        possibleCustomDataField={task.customFields.find(
          (el) => el.id === customDeclaredField.id,
        )}
      />
    {/if}
  {/each}
  <CheckedBtn bind:task {selectCurrentTask} {toggleIsCheckedOnCurrentTask} />
  <DeleteBtn {wantToDeleteTask} />
</tr>
