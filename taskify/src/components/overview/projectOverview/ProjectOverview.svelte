<!-- This component wrap the components for viewing and editing a project. -->

<script lang="ts">
  import type {
    LocalProject,
    LocalProjectTask,
    PossiblePopups,
  } from "@components/types";
  import AddTaskSection from "./AddTaskSection.svelte";
  import EmptyProjectScreen from "./EmptyProjectScreen.svelte";
  import HeadSection from "./HeadSection.svelte";
  import TableSection from "./tableSection/TableSection.svelte";
  import SearchSection from "./searchSection/SearchSection.svelte";
  import { filterTasksBySearchQuery } from "src/utils/searchHandler/searchHandler";
  import { sortTasksByProjectSettings } from "src/utils/searchHandler/sortHandler";
  import { groupTasksByProjectSettings } from "src/utils/searchHandler/groupHandler";
  import { flattenTasks } from "src/utils/searchHandler/flattenTasks";

  let {
    currentProject = $bindable(),
    popup = $bindable(),
    currentTask = $bindable(),
  }: {
    currentProject: LocalProject;
    popup: PossiblePopups;
    currentTask: LocalProjectTask | null;
  } = $props();

  function wantToAddTask() {
    popup = "add_task";
  }

  function wantToDeleteTask() {
    popup = "delete_task";
  }

  const preferencesAppliedTasks = $derived.by(() => {
    const filteredTasks = filterTasksBySearchQuery(
      currentProject.searchQuery,
      currentProject.tasks,
      currentProject.customFields,
    );

    const groupedTasks = groupTasksByProjectSettings(
      currentProject.groupedBy,
      filteredTasks,
    );

    const sortedTasks = sortTasksByProjectSettings(
      currentProject.sortedBy,
      currentProject.sortDirection,
      groupedTasks,
    );

    const flattenedTasks = flattenTasks(
      currentProject.sortedBy,
      currentProject.sortDirection,
      currentProject.groupedBy,
      sortedTasks,
    );

    return flattenedTasks;
  });

  const countOfShownTasks = $derived.by(
    () => preferencesAppliedTasks.filter((el) => el !== null).length,
  );
</script>

<HeadSection bind:popup {currentProject} />
<SearchSection
  {popup}
  bind:searchQuery={currentProject.searchQuery}
  shownCount={countOfShownTasks}
  exsitingCount={currentProject.tasks.length}
  customFields={currentProject.customFields}
  bind:sortedBy={currentProject.sortedBy}
  bind:groupedBy={currentProject.groupedBy}
  bind:sortDirection={currentProject.sortDirection}
  {currentProject}
/>
{#if countOfShownTasks === 0}
  <EmptyProjectScreen />
{:else}
  <TableSection
    {currentProject}
    {preferencesAppliedTasks}
    {wantToDeleteTask}
    bind:currentTask
    bind:popup
  />
{/if}
<AddTaskSection {wantToAddTask} />
<div class="h-4"></div>
