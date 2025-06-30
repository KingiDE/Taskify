<!-- The entire sidebar that contains the burger-icon plus heading, all projects as Navbar-Icons and the WantToAddProjectButton-button. -->

<script lang="ts">
  import type { LocalProject, PossiblePopups } from "@components/types";
  import Heading from "./Heading.svelte";
  import ProjectIcon from "./ProjectIcon.svelte";
  import SettingsButton from "./SettingsButton.svelte";
  import WantToAddButton from "./WantToAddProjectButton.svelte";

  let {
    isSidebarExpanded,
    toggleIsSidebarExpanded,
    popup = $bindable(),
    projects,
    currentProject = $bindable(),
  }: {
    isSidebarExpanded: boolean;
    toggleIsSidebarExpanded: () => void;
    popup: PossiblePopups;
    projects: Array<LocalProject>;
    currentProject: LocalProject | null;
  } = $props();
</script>

<div
  class={`${isSidebarExpanded ? "w-[320px]" : "w-[72px]"} transition-[width] bg-gray-800 rounded-md p-4 flex flex-col`}
  id="sidebar"
>
  <Heading {toggleIsSidebarExpanded} {isSidebarExpanded} />
  <WantToAddButton {isSidebarExpanded} bind:popup />
  <div class="mt-2 mb-auto grid gap-2 grid-flow-row overflow-y-scroll pr-0">
    {#each projects as item}
      <ProjectIcon
        id={item.id}
        name={item.name}
        accentColor={item.accentColor}
        projectIcon={item.icon}
        {isSidebarExpanded}
        {projects}
        bind:currentProject
        bind:popup
      />
    {/each}
  </div>
  <SettingsButton {isSidebarExpanded} bind:popup />
</div>
