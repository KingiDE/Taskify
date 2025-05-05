<script lang="ts">
import Popup from "./Popup.svelte";
import Overview from "./overview/Overview.svelte";
import CreateProjectPopup from "./popups/project/CreateProjectPopup.svelte";
import EditProjectPopup from "./popups/project/editProjectPopup/EditProjectPopup.svelte";
import SettingsPopup from "./popups/settingsTab/SettingsPopup.svelte";
import CreateTaskPopup from "./popups/task/CreateTaskPopup.svelte";
import DeleteTaskPopup from "./popups/task/DeleteTaskPopup.svelte";
import EditTaskPopup from "./popups/task/EditTaskPopup.svelte";
import Sidebar from "./sidebar/Sidebar.svelte";

import {
	addNewProject,
	addTaskToProject,
	currentProject,
	currentTask,
	deleteCurrentSelectedProject,
	deleteTaskWithCurrentId,
	mount,
	popup,
	projects,
	switchToTask,
	update,
} from "@hooks/twoColumns/useProject.svelte.ts";
import {
	isSidebarExpanded,
	toggleIsSidebarExpanded,
} from "@hooks/twoColumns/useSidebar.svelte.ts";
import { addTaskInput } from "@hooks/useCreateTaskPopup.svelte";
import type { PossiblePopups } from "./types";

mount();
update();
</script>

<!-- The root component that contains the sidebar, the overview and renders all popups.  -->
<div class="flex gap-2 p-2 pr-1.5 h-[100dvh]" role="button">
  <Sidebar
    isSidebarExpanded={isSidebarExpanded.value}
    toggleIsSidebarExpanded={() => {
      toggleIsSidebarExpanded(popup.value);
    }}
    bind:popup={popup.value}
    projects={projects.value}
    bind:currentProject={currentProject.value}
  />
  <div
    class="bg-gray-800 w-full overflow-x-hidden rounded-md p-4 max-h-[100dvh] overflow-y-scroll"
  >
    <Overview
      currentProject={currentProject.value}
      bind:popup={popup.value}
      bind:currentTask={currentTask.value}
    />
  </div>
  <Popup
    bind:popup={popup.value}
    onClose={() => {
      // Resets the addTaskInput to default when ANY popup gets closed
      addTaskInput.value = {
        title: "",
        description: "",
        isChecked: false,
        difficulty: "medium",
        size: "medium",
        childTasks: [],
        customFields: [],
      };
    }}
    maxWidth="max-w-[825px]"
  >
    {#snippet innerPopup()}
      {#if popup.value === "add_project"}
        <CreateProjectPopup bind:popup={popup.value} {addNewProject} />
      {/if}
      {#if popup.value === "edit_project" && currentProject.value !== null}
        <EditProjectPopup
          bind:popup={popup.value}
          {deleteCurrentSelectedProject}
          bind:currentProject={currentProject.value}
        />
      {/if}
      {#if popup.value === "add_task" && currentProject.value !== null}
        <CreateTaskPopup
          bind:popup={popup.value}
          {addTaskToProject}
          currentProject={currentProject.value}
          switchToTask={(task) => {
            popup.value = "edit_task";
            switchToTask(task);
          }}
        />
      {/if}
      {#if popup.value === "delete_task" && currentProject.value !== null}
        <DeleteTaskPopup {deleteTaskWithCurrentId} bind:popup={popup.value} />
      {/if}
      {#if popup.value === "edit_task" && currentProject.value !== null && currentTask.value !== null}
        <EditTaskPopup
          currentProject={currentProject.value}
          currentTask={currentTask.value}
          bind:popup={popup.value}
          {deleteTaskWithCurrentId}
          switchToTask={(task) => {
            popup.value = "edit_task";
            switchToTask(task);
          }}
        />
      {/if}
      {#if popup.value === "settings"}
        <SettingsPopup projects={projects.value} />
      {/if}
    {/snippet}
  </Popup>
</div>
