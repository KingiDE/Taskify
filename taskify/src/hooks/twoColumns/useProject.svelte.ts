import { onMount } from "svelte";
import type {
	LocalProject,
	LocalProjectCustomField,
	LocalProjectTask,
	PossiblePopups,
} from "../../components/types";
import { deleteProject, loadProjects, storeProject } from "../db.svelte";
import {
	isSidebarExpanded,
	toggleIsSidebarExpanded,
} from "./useSidebar.svelte";

// Stores the current popup
// biome-ignore lint/style/useConst: <explanation>
export let popup = $state<{ value: PossiblePopups }>({ value: null });

// Stores all projects and the current one.
// The current project is used to determine the data shown in the edit-popup.
// biome-ignore lint/style/useConst: <explanation>
export let projects = $state<{ value: Array<LocalProject> }>({ value: [] });
// biome-ignore lint/style/useConst: <explanation>
export let currentProject = $state<{ value: LocalProject | null }>({
	value: null,
});

// The current task is used to determine the data shown in the edit-popup.
// biome-ignore lint/style/useConst: <explanation>
export let currentTask = $state<{ value: LocalProjectTask | null }>({
	value: null,
});

// Pushes the given project to the state and then calls the db-handler to store it in the IndexDB.
export function addNewProject(newProject: LocalProject) {
	projects.value.push(newProject);
	storeProject({
		...newProject,
		enabledFields: [...newProject.enabledFields],
		tasks: [...newProject.tasks],
		customFields: [...newProject.customFields],
	});
}

// Deletes the current project, if it isn't null, from the state and calls the db-handler to also delete from the IndexDB.
// Sets the current project to null afterwards.
export function deleteCurrentSelectedProject() {
	if (currentProject.value === null) return;
	projects.value = projects.value.filter(
		(project) => project.id !== currentProject.value?.id,
	);
	deleteProject(currentProject.value.id);
	currentProject.value = null;
}

// Pushes the given task to the project's tasks.
export function addTaskToProject(newTask: LocalProjectTask) {
	if (currentProject.value === null) return;
	currentProject.value.tasks.push(newTask);
}

// Deletes the task with the id of the current task from the current project if both aren't null.
export function deleteTaskWithCurrentId() {
	if (currentProject.value === null || currentTask.value === null) return;
	currentProject.value.tasks = currentProject.value.tasks.filter(
		(task) => task.id !== currentTask.value?.id,
	);
}

// Handler function to update the current task to the one given.
export function switchToTask(task: LocalProjectTask) {
	currentTask.value = task;
}

// Loads all projects on first component render.
export function mount() {
	onMount(async () => {
		document.addEventListener("keydown", (e) => {
			// Close all popups
			if (e.key === "Escape") {
				popup.value = null;
			}

			// If an input or textarea are focused, other hotkeys than the "close-hotkey" don't work
			if (
				document.activeElement?.tagName === "INPUT" ||
				document.activeElement?.tagName === "TEXTAREA"
			)
				return;

			// Toggle sidebar expanded
			if (e.key === "B") {
				toggleIsSidebarExpanded(popup.value);
			}

			// Set popup to "add_task" if sidebar is not expanded, no popup is open and a project is selected,
			// else set popup to "add_project".
			if (
				e.key === "N" &&
				!isSidebarExpanded.value &&
				currentProject.value &&
				!popup.value
			) {
				popup.value = "add_task";
			} else if (e.key === "N" && !popup.value) {
				popup.value = "add_project";
			}
			// Set popup to "edit_project" if there's a project selected and no popup is open.
			if (e.key === "E" && currentProject.value && !popup.value) {
				popup.value = "edit_project";
			}
		});
		async function sett() {
			projects.value = await loadProjects();
		}
		sett();
	});
}

// Everytime the current project changes, it's stored value will be entirely overwritten with the new values.
export function update() {
	$effect(() => {
		async function sett() {
			if (currentProject.value === null) return;

			// Deep copy all custom fields that exist in a project
			const newCustomFields: Array<LocalProjectCustomField> = [];
			for (const item of currentProject.value.customFields) {
				if (item.options === null) {
					newCustomFields.push({ ...item });
				} else {
					newCustomFields.push({ ...item, options: [...item.options] });
				}
			}

			// Deep copy all tasks of the current project
			const newTasks: Array<LocalProjectTask> = [];
			for (const item of currentProject.value.tasks) {
				// Deep copy custom field values a task has stored
				const newCustomFields = [];
				for (const customField of item.customFields) {
					newCustomFields.push({ ...customField });
				}

				newTasks.push({
					...item,
					childTasks: [...item.childTasks],
					customFields: newCustomFields,
				});
			}

			await storeProject({
				...currentProject.value,
				tasks: newTasks,
				enabledFields: [...currentProject.value.enabledFields],
				customFields: newCustomFields,
			});
		}
		sett();
	});
}
