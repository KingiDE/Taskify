<!-- The component that is shown when switching to the relation-tab while creating or editing a task. -->

<script lang="ts">
	import type {
		LocalProject,
		LocalProjectTask,
		PossibleEditTaskPopupTabs,
	} from "@components/types";
	import { onMount } from "svelte";
	import DeleteRelationSubPopup from "./DeleteRelationSubPopup.svelte";
	import ExistingTasksSection from "./ExistingTasksSection.svelte";
	import SearchTasksSection from "./SearchTasksSection.svelte";

	// biome-ignore lint/style/useConst: These are props and work like this
	let {
		switchToTask,
		currentProject,
		task = $bindable(),
		currentTab = $bindable(),
	}: {
		switchToTask: (task: LocalProjectTask) => void;
		currentProject: LocalProject;
		task: Omit<LocalProjectTask, "id">;
		currentTab: PossibleEditTaskPopupTabs;
	} = $props();

	let showDeletePopup = $state<string | null>(null);

	function wantToDeleteRelation(relatedTaskId: string) {
		showDeletePopup = relatedTaskId;
	}

	// biome-ignore lint/style/useConst: <explanation>
	let searchbar = $state<HTMLInputElement | null>(null);

	onMount(() => {
		// Moving into seperate function to be able to remove later
		function handleF(e: KeyboardEvent) {
			// If an input is focused, hotkeys don't work
			if (document.activeElement?.tagName === "INPUT") return;

			if (e.key === "F" && searchbar) {
				searchbar.focus();
				// Cancels the event
				e.preventDefault();
			}
		}

		document.addEventListener("keydown", handleF);

		return () => {
			document.removeEventListener("keydown", handleF);
		};
	});
</script>

<ExistingTasksSection
	{currentProject}
	{wantToDeleteRelation}
	bind:task
	{switchToTask}
	bind:currentTab
/>
<SearchTasksSection
	{switchToTask}
	{currentProject}
	bind:task
	bind:currentTab
	bind:searchbar
/>
<DeleteRelationSubPopup bind:task bind:showDeletePopup />
