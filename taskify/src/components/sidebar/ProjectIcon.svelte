<!-- The component for rendering all project Navbar-Icons to the sidebar. -->

<script lang="ts">
  import { mapAccentColorClass } from "../../utils/projectIcon/mapAccentColorClass";
  import type {
    LocalProject,
    LocalProjectColor,
    PossiblePopups,
  } from "@components/types";
  import Button from "@ui/Button.svelte";
  import Icon from "@ui/Icon.svelte";
  import type { icons } from "@ui/icons";

  let {
    id,
    name,
    accentColor,
    isSidebarExpanded,
    projectIcon,
    projects,
    currentProject = $bindable(),
    popup = $bindable(),
  }: {
    id: string;
    name: string;
    accentColor: LocalProjectColor;
    isSidebarExpanded: boolean;
    projectIcon: keyof typeof icons;
    projects: Array<LocalProject>;
    currentProject: LocalProject | null;
    popup: PossiblePopups;
  } = $props();

  function selectProjectWithId(id: string) {
    const possibleProject = projects.find((item) => item.id === id);
    if (possibleProject) {
      currentProject = possibleProject;
    }
  }

  let accentColorClass = $derived.by(() => {
    return mapAccentColorClass(accentColor, currentProject?.id, id);
  });
</script>

<Button
  meaning="discrete-neutral"
  onClick={() => {
    popup = null;
    selectProjectWithId(id);
  }}
  extraCSS={`${accentColorClass} transition-[background] h-10`}
>
  {#snippet text()}
    <div
      class={`transition-opacity duration-[50ms] ${isSidebarExpanded ? "opacity-100 delay-100" : "opacity-0"}`}
    >
      {name}
    </div>
  {/snippet}
  {#snippet icon()}
    <Icon
      extraCSS="flex-none"
      name={projectIcon}
      variant="rounded"
      width={24}
      height={24}
    />
  {/snippet}
</Button>
