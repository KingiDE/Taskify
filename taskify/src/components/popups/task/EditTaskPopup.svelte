<!-- The component that is shown when editing an existing task. It contains the Navbar-Icons as links and tabs. -->

<script lang="ts">
  import type {
    LocalProject,
    LocalProjectTask,
    PossibleEditTaskPopupTabs,
    PossiblePopups,
  } from "@components/types";
  import NavbarIcon from "../NavbarIcon.svelte";
  import DestructiveTab from "./shared/DestructiveTab.svelte";
  import AppearanceTab from "./shared/appearanceTab/AppearanceTab.svelte";
  import FieldsTab from "./shared/fieldsTab/FieldsTab.svelte";
  import RelationTab from "./shared/relationTab/RelationTab.svelte";

  // biome-ignore lint/style/useConst: These are props and work like this
  let {
    popup = $bindable(),
    currentTask,
    currentProject,
    deleteTaskWithCurrentId,
    switchToTask,
  }: {
    popup: PossiblePopups;
    currentTask: LocalProjectTask;
    currentProject: LocalProject;
    deleteTaskWithCurrentId: () => void;
    switchToTask: (task: LocalProjectTask) => void;
  } = $props();

  // biome-ignore lint/style/useConst: <explanation>
  let currentTab = $state<PossibleEditTaskPopupTabs>("appearance");
</script>

<div class="flex flex-col gap-4 w-full max-h-[700px] h-[calc(100dvh_-_48px)]">
  <h1 class="font-poppins font-bold text-2xl">Edit task</h1>
  <div
    class="grid min-[700px]:grid-cols-[250px_auto] gap-8 overflow-y-hidden h-full"
  >
    <nav class="grid gap-2 content-start">
      <NavbarIcon
        buttonText="Appearance"
        iconName="edit"
        tabValue="appearance"
        bind:currentTab
      />
      <NavbarIcon
        buttonText="Fields"
        iconName="customize"
        tabValue="fields"
        bind:currentTab
      />
      <NavbarIcon
        buttonText="Relations"
        iconName="relation"
        tabValue="relation"
        bind:currentTab
      />
      <NavbarIcon
        buttonText="Destructive"
        iconName="delete"
        tabValue="destruction"
        bind:currentTab
      />
    </nav>
    <div class="overflow-y-scroll pr-1.5">
      {#if currentTab === "appearance"}
        <AppearanceTab bind:task={currentTask} />
      {/if}
      {#if currentTab === "fields"}
        <FieldsTab bind:task={currentTask} {currentProject} />
      {/if}
      {#if currentTab === "relation"}
        <RelationTab
          bind:task={currentTask}
          {currentProject}
          {switchToTask}
          bind:currentTab
        />
      {/if}
      {#if currentTab === "destruction"}
        <DestructiveTab bind:popup {deleteTaskWithCurrentId} />
      {/if}
    </div>
  </div>
</div>
