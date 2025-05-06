import type {
	LocalProject,
	LocalProjectTask,
	PossibleEditTaskPopupTabs,
	TaskCheckboxVariantCustomField,
	TaskSelectVariantCustomField,
	TaskTextOrNumberVariantCustomField,
} from "@components/types";

// Store the current tab for the CreateTaskPopup
// biome-ignore lint/style/useConst: <explanation>
export let currentTab = $state<{ value: PossibleEditTaskPopupTabs }>({
	value: "appearence",
});

// Store the current input for creating tasks
// biome-ignore lint/style/useConst: <explanation>
export let addTaskInput = $state<{ value: Omit<LocalProjectTask, "id"> }>({
	value: {
		title: "",
		description: "",
		isChecked: false,
		difficulty: "medium",
		size: "medium",
		childTasks: [],
		customFields: [],
	},
});

// Sets invalid inputs to true if the title is empty
export function getInvalidInputs() {
	return addTaskInput.value.title === "";
}

// Calls the addTaskToProject function with all values from the input and resets those.
// If invalidInputs is true, do nothing.
export function addTask(
	project: LocalProject,
	invalidInputs: boolean,
	addTaskToProject: (inputs: LocalProjectTask) => void,
) {
	if (invalidInputs) return;

	const customFields: Array<
		| TaskCheckboxVariantCustomField
		| TaskSelectVariantCustomField
		| TaskTextOrNumberVariantCustomField
	> = [];

	project.customFields.map((field) => {
		// Set a default value for all existing custom fields
		if (field.variant === "checkbox") {
			customFields.push({
				id: field.id,
				variant: "checkbox",
				value: false,
			});
		} else if (field.variant === "text" || field.variant === "number") {
			customFields.push({
				id: field.id,
				variant: field.variant,
				value: "",
			});
		} else {
			customFields.push({
				id: field.id,
				variant: "select",
				value: null,
			});
		}
	});

	addTaskToProject({
		id: Date.now().toString(),
		...addTaskInput.value,
		customFields,
	});

	resetCreateTaskInputs();
}

export function resetCreateTaskInputs() {
	addTaskInput.value = {
		title: "",
		description: "",
		isChecked: false,
		difficulty: "medium",
		size: "medium",
		childTasks: [],
		customFields: [],
	};
}
