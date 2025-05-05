<!-- The component that is shown in the relation-tab. It handles searches for possible relations. -->

<script lang="ts">
import type {
	LocalProject,
	LocalProjectTask,
	PossibleEditTaskPopupTabs,
} from "@components/types";
import Icon from "@ui/Icon.svelte";
import Input from "@ui/Input.svelte";
import { filterTasksBySearchQuery } from "src/utils/searchHandler/searchHandler";
import SearchResult from "./SearchResult.svelte";

// biome-ignore lint/style/useConst: These are props and work like this
let {
	switchToTask,
	currentProject,
	task = $bindable(),
	currentTab = $bindable(),
	searchbar = $bindable(),
}: {
	switchToTask: (task: LocalProjectTask) => void;
	currentProject: LocalProject;
	task: Omit<LocalProjectTask, "id">;
	currentTab: PossibleEditTaskPopupTabs;
	searchbar: HTMLInputElement | null;
} = $props();

// biome-ignore lint/style/useConst: <explanation>
let searchQuery = $state("");

const searchResults = $derived.by(() => {
	if (searchQuery === "") return [];
	const logicalFilter = currentProject.tasks.filter((element) => {
		// Doesn't reference itself if it has an id (= already exists and isn't edited)
		if ("id" in task && task.id === element.id) {
			return false;
		}
		// Doesn't show up when its already added
		if (task.childTasks.includes(element.id)) {
			return false;
		}

		return true;
	});

	return filterTasksBySearchQuery(
		searchQuery,
		logicalFilter,
		currentProject.customFields,
	);
});

$inspect(searchResults);
</script>

<div class="mt-2 min-h-[375px]">
  <div>Add subtasks:</div>
  <div class="relative bg-gray-700">
    <Icon
      name="search"
      variant="rounded"
      width={24}
      height={24}
      extraCSS="absolute top-1/2 -translate-y-1/2 left-2"
    />
    <Input
      bind:searchbar
      placeholder="Search by typing the name or use operators"
      getter={() => searchQuery}
      setter={(newValue) => (searchQuery = newValue)}
      inputExtraCSS="pl-10"
    />
  </div>
  <div class="mt-2 h-[160px]">
    {#if searchResults.length === 0}
      <div class="mt-1 grid place-items-center place-content-center h-full">
        <div>ℹ️</div>
        <div class="text-center max-w-[400px]">
          There aren't any search results. Please alter your search query or
          input something into the search bar.
        </div>
      </div>
    {:else}
      <div class="grid gap-1">
        {#each searchResults as result}
          <SearchResult
            bind:currentTab
            {switchToTask}
            subtask={result}
            hasMargin={false}
            variant="add"
            onClick={() => task.childTasks.push(result.id)}
            {currentProject}
          />
        {/each}
      </div>
    {/if}
  </div>
</div>
