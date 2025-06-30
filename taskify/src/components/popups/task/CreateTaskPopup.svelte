<!-- The component that is shown when you want to create a new task. -->

<script lang="ts">
  import type {
    LocalProject,
    LocalProjectTask,
    PossiblePopups,
  } from "@components/types";
  import Button from "@ui/Button.svelte";
  import NavbarIcon from "../NavbarIcon.svelte";
  import AppearanceTab from "../task/shared/appearanceTab/AppearanceTab.svelte";
  import RelationTab from "../task/shared/relationTab/RelationTab.svelte";
  import FieldsTab from "./shared/fieldsTab/FieldsTab.svelte";

  let {
    currentProject,
    popup = $bindable(),
    addTaskToProject,
    switchToTask,
  }: {
    currentProject: LocalProject;
    popup: PossiblePopups;
    addTaskToProject: (inputs: LocalProjectTask) => void;
    switchToTask: (task: LocalProjectTask) => void;
  } = $props();

  import {
    addTask,
    addTaskInput,
    currentTab,
    getInvalidInputs,
  } from "@hooks/useCreateTaskPopup.svelte";

  function hidePopup() {
    popup = null;
  }

  const invalidInputs = $derived.by(getInvalidInputs);
</script>

<div class="w-full flex flex-col gap-4 max-h-[700px] h-[calc(100dvh_-_48px)]">
  <h1 class="font-poppins font-bold text-2xl">Create task</h1>
  <div
    class="grid min-[700px]:grid-cols-[250px_auto] gap-8 mb-auto overflow-y-hidden"
  >
    <nav class="grid gap-2 content-start">
      <NavbarIcon
        buttonText="Appearance"
        iconName="edit"
        tabValue="appearance"
        bind:currentTab={currentTab.value}
      />
      <NavbarIcon
        buttonText="Fields"
        iconName="customize"
        tabValue="fields"
        bind:currentTab={currentTab.value}
      />
      <NavbarIcon
        buttonText="Relations"
        iconName="relation"
        tabValue="relation"
        bind:currentTab={currentTab.value}
      />
    </nav>
    <div class="overflow-y-scroll pr-1.5">
      {#if currentTab.value === "appearance"}
        <AppearanceTab bind:task={addTaskInput.value} />
      {/if}
      {#if currentTab.value === "fields"}
        <FieldsTab bind:task={addTaskInput.value} {currentProject} />
      {/if}
      {#if currentTab.value === "relation"}
        <RelationTab
          bind:task={addTaskInput.value}
          {currentProject}
          {switchToTask}
          bind:currentTab={currentTab.value}
        />
      {/if}
    </div>
  </div>
  <Button
    meaning="positive"
    onClick={() => {
      addTask(currentProject, invalidInputs, addTaskToProject);
      hidePopup();
    }}
    extraCSS="h-10"
    disabled={invalidInputs}
  >
    {#snippet text()}
      Create
    {/snippet}
  </Button>
</div>
