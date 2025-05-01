<script lang="ts">
  import type {
    LocalProject,
    LocalProjectCustomField,
    LocalProjectSortDirection,
    PossibleSearchSubpopups,
  } from "@components/types";
  import ListOfAllFields from "./ListOfAllFields.svelte";
  import Icon from "@ui/Icon.svelte";
  import Button from "@ui/Button.svelte";
  import { firstCapital } from "src/utils/stringUtils";

  let {
    subpopup = $bindable(),
    sortedBy = $bindable(),
    groupedBy = $bindable(),
    sortDirection = $bindable(),
    customFields,
    currentProject,
  }: {
    subpopup: PossibleSearchSubpopups;
    sortedBy: string;
    groupedBy: string | null;
    customFields: Array<LocalProjectCustomField>;
    sortDirection: LocalProjectSortDirection;
    currentProject: LocalProject;
  } = $props();

  function returnPrettyName(key: string) {
    if (
      [
        "title",
        "description",
        "difficulty",
        "size",
        "done",
        "relations",
      ].includes(key)
    ) {
      return `Sorted by ${firstCapital(key)}`;
    } else {
      const possibleEntry = currentProject.customFields.find(
        (el) => el.id === key
      );

      if (possibleEntry) {
        return `Sorted by ${possibleEntry.name}`;
      } else {
        return `Sorted by custom field`;
      }
    }
  }
</script>

<div class="flex gap-2">
  <div class="relative">
    <Button
      meaning="neutral"
      onClick={(e) => {
        // Check for the target to not have the id "toggleSortingDirection" and not be a <path> element
        if (
          e.target &&
          "getAttribute" in e.target &&
          typeof e.target.getAttribute === "function" &&
          e.target.getAttribute("id") !== "toggleSortingDirection" &&
          "tagName" in e.target &&
          typeof e.target.tagName === "string" &&
          e.target.tagName !== "path"
        ) {
          subpopup = subpopup === "sort" ? null : "sort";
        }
      }}
      extraCSS="mt-2 px-2 py-1.5 min-w-[192px]"
      extraRules={["no-padding"]}
    >
      {#snippet icon()}
        <Button
          meaning="discrete-neutral"
          onClick={() =>
            (sortDirection =
              sortDirection === "ascending" ? "descending" : "ascending")}
          extraRules={["no-padding"]}
        >
          {#snippet icon()}
            <!-- Id to differentiate between the toggle direction btn and open menu btn -->
            <Icon
              id="toggleSortingDirection"
              width={24}
              height={24}
              variant="rounded"
              name="sort"
              extraCSS={`transition-[rotate] ${sortDirection === "descending" ? "" : "rotate-[x_180deg]"}`}
            />
          {/snippet}
        </Button>
      {/snippet}
      {#snippet text()}
        <div class="flex gap-1 text-nowrap">
          {returnPrettyName(sortedBy)}
          <div class="opacity-50">({firstCapital(sortDirection)})</div>
        </div>
      {/snippet}
    </Button>
    {#if subpopup === "sort"}
      <ListOfAllFields
        {customFields}
        bind:valueToUpdate={sortedBy}
        bind:subpopup
      />
    {/if}
  </div>
  <div class="relative">
    <Button
      meaning="neutral"
      onClick={() => (subpopup = subpopup === "group" ? null : "group")}
      extraCSS="mt-2 px-2 py-1.5"
      extraRules={["no-padding"]}
    >
      {#snippet icon()}
        <Icon width={24} height={24} variant="rounded" name="group" />
      {/snippet}
      {#snippet text()}
        Group
      {/snippet}
    </Button>
    {#if subpopup === "group"}
      <ListOfAllFields
        {customFields}
        bind:valueToUpdate={groupedBy}
        bind:subpopup
        showUnsetBtn
      />
    {/if}
  </div>
</div>
