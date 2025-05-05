<!-- This component wraps the components for displaying all tasks of a project. -->

<script lang="ts">
import type {
	LocalProject,
	LocalProjectTask,
	PossiblePopups,
} from "@components/types";
import SpacingTableRow from "./SpacingTableRow.svelte";
import TableHead from "./TableHead.svelte";
import TableRow from "./tableRow/TableRow.svelte";

let {
	currentProject,
	preferencesAppliedTasks,
	wantToDeleteTask,
	currentTask = $bindable(),
	popup = $bindable(),
}: {
	currentProject: LocalProject;
	preferencesAppliedTasks: Array<LocalProjectTask | null>;
	wantToDeleteTask: () => void;
	currentTask: LocalProjectTask | null;
	popup: PossiblePopups;
} = $props();

function selectCurrentTask(task: LocalProjectTask) {
	currentTask = task;
}

function wantToEditTask() {
	popup = "edit_task";
}

function toggleIsCheckedOnCurrentTask() {
	if (currentTask === null) return;
	currentTask.isChecked = !currentTask.isChecked;
}

function getMaxWithFromCountOfCustomFields() {
	if (currentProject.customFields.filter((el) => el.isVisible).length === 0)
		return "1200px";

	const maxWNumber = `${1200 + currentProject.customFields.length * 150}px`;
	return `${maxWNumber}`;
}
</script>

<div class="overflow-x-scroll pb-1 min-h-[400px]">
	<table
		class={`pretty mt-2 w-full`}
		style={`max-width: ${getMaxWithFromCountOfCustomFields()};`}
	>
		<TableHead {currentProject} />
		<tbody>
			{#each preferencesAppliedTasks as task, index}
				{#if task === null}
					<SpacingTableRow {currentProject} />
				{:else}
					<TableRow
						{task}
						{selectCurrentTask}
						{wantToEditTask}
						{toggleIsCheckedOnCurrentTask}
						{wantToDeleteTask}
						{currentProject}
					/>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
