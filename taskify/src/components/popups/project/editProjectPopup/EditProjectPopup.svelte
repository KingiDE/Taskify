<!-- This popup shows when you want to edit a project. -->

<script lang="ts">
  import type {
    LocalProject,
    PossibleEditProjectPopupTabs,
    PossiblePopups,
  } from "@components/types";
  import NavbarIcon from "../../NavbarIcon.svelte";
  import DestructiveTab from "./tabs/DestructiveTab.svelte";
  import EditAppearanceTab from "./tabs/EditAppearanceTab.svelte";
  import FieldsTab from "./tabs/fieldsTab/FieldsTab.svelte";

  let {
    currentProject = $bindable(),
    popup = $bindable(),
    deleteCurrentSelectedProject,
  }: {
    currentProject: LocalProject;
    popup: PossiblePopups;
    deleteCurrentSelectedProject: () => void;
  } = $props();

  let currentTab = $state<PossibleEditProjectPopupTabs>("appearance");
</script>

<div class="max-h-[700px] h-[calc(100dvh_-_48px)] grid content-start w-full">
  <h1 class="font-poppins font-bold text-2xl justify-self-start">
    Edit project
  </h1>
  <div
    class="mt-4 grid min-[720px]:grid-cols-[250px_auto] gap-8 h-full content-start overflow-y-hidden"
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
        buttonText="Destruction"
        iconName="delete"
        tabValue="destruction"
        bind:currentTab
      />
    </nav>
    <div class="overflow-y-scroll pr-1.5">
      {#if currentTab === "appearance"}
        <EditAppearanceTab bind:currentProject />
      {/if}
      {#if currentTab === "fields"}
        <FieldsTab bind:project={currentProject} />
      {/if}
      {#if currentTab === "destruction"}
        <DestructiveTab bind:popup {deleteCurrentSelectedProject} />
      {/if}
    </div>
  </div>
</div>
