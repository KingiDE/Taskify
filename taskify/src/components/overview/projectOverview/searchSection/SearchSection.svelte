<script lang="ts">
  import type {
    LocalProject,
    LocalProjectCustomField,
    LocalProjectSortDirection,
    PossiblePopups,
    PossibleSearchSubpopups,
  } from "@components/types";
  import ShowCountSection from "./ShowCountSection.svelte";
  import SearchbarSection from "./SearchbarSection.svelte";
  import SortAndGroupSection from "./sortAndGroupSection/SortAndGroupSection.svelte";

  let {
    popup,
    searchQuery = $bindable(),
    shownCount,
    exsitingCount,
    sortedBy = $bindable(),
    groupedBy = $bindable(),
    sortDirection = $bindable(),
    customFields,
    currentProject,
  }: {
    popup: PossiblePopups;
    searchQuery: string;
    shownCount: number;
    exsitingCount: number;
    sortedBy: string;
    groupedBy: string | null;
    sortDirection: LocalProjectSortDirection;
    customFields: Array<LocalProjectCustomField>;
    currentProject: LocalProject;
  } = $props();

  let subpopup = $state<PossibleSearchSubpopups>(null);

  function hideAnySubpopup() {
    subpopup = null;
  }
</script>

<SearchbarSection {popup} bind:searchQuery {hideAnySubpopup} />
<SortAndGroupSection
  bind:sortedBy
  bind:groupedBy
  bind:subpopup
  bind:sortDirection
  {customFields}
  {currentProject}
/>
<ShowCountSection {exsitingCount} {shownCount} />
