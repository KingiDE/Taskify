<!-- This component renders all existing subtasks of the current task. -->

<script lang="ts">
  import type {
    LocalProject,
    LocalProjectTask,
    PossibleEditTaskPopupTabs,
  } from "@components/types";
  import SearchResult from "./SearchResult.svelte";

  let {
    currentProject,
    task = $bindable(),
    currentTab = $bindable(),
    switchToTask,
    wantToDeleteRelation,
  }: {
    currentProject: LocalProject;
    task: Omit<LocalProjectTask, "id">;
    currentTab: PossibleEditTaskPopupTabs;
    switchToTask: (task: LocalProjectTask) => void;
    wantToDeleteRelation: (relatedTaskId: string) => void;
  } = $props();

  function findTasksWithIds(ids: Array<string>) {
    return currentProject.tasks.filter((element) => ids.includes(element.id));
  }
</script>

<div>Existing subtasks:</div>
<div class="h-[160px]">
  {#if task.childTasks.length > 0}
    {#each findTasksWithIds(task.childTasks) as subtask}
      <SearchResult
        bind:currentTab
        {switchToTask}
        {subtask}
        hasMargin={true}
        variant="delete"
        onClick={() => wantToDeleteRelation(subtask.id)}
        {currentProject}
      />
    {/each}
  {:else}
    <div class="mt-1 place-items-center place-content-center h-full">
      <div>ℹ️</div>
      <div>This task doesn't have any subtasks yet!</div>
    </div>
  {/if}
</div>
