import type {
	LocalProject,
	LocalProjectCustomFieldInput,
} from "@components/types";
import { optimizeOptionsArray } from "src/utils/customFieldsInput";

// Stores the values when creating a new custom field inside a project.
// biome-ignore lint/style/useConst: <explanation>
export let addCustomFieldInputs = $state<{
	value: LocalProjectCustomFieldInput;
}>({
	value: {
		name: "",
		variant: "number",
		options: [],
	},
});

// Located in utils to allow shared behaviour with useEditCustomField.svelte.ts
export function updateInputsFieldsInSelectEffect() {
	optimizeOptionsArray(addCustomFieldInputs.value);
}

// Sets the inputs to invalid if the name of the newly created custom field is empty.
export function getInvalidInputs() {
	return addCustomFieldInputs.value.name === "";
}

// Pushes the inputs to the custom fields of the given project. This querky code is required because of type-safety.
// Afterwards resets the values of the input to default.
export function addCustomFieldToProject(project: LocalProject) {
	const usedId = Date.now().toString();

	if (addCustomFieldInputs.value.variant === "select") {
		project.customFields.push({
			id: usedId,
			name: addCustomFieldInputs.value.name,
			variant: "select",
			options: addCustomFieldInputs.value.options.filter(
				(element) => element !== "",
			),
			isVisible: true,
		});

		// Set a default value in all tasks
		project.tasks.map((task) => {
			task.customFields.push({
				id: usedId,
				variant: "select",
				value: null,
			});
		});
	} else {
		project.customFields.push({
			id: usedId,
			name: addCustomFieldInputs.value.name,
			variant: addCustomFieldInputs.value.variant,
			// The options are always set to null because by following the type defenitions they could be of type string[],
			options: null,
			isVisible: true,
		});

		// Set a default value in all tasks
		project.tasks.map((task) => {
			if (addCustomFieldInputs.value.variant === "checkbox") {
				task.customFields.push({
					id: usedId,
					variant: "checkbox",
					value: false,
				});
			} else {
				task.customFields.push({
					id: usedId,
					variant: addCustomFieldInputs.value.variant,
					value: "",
				});
			}
		});
	}

	addCustomFieldInputs.value = {
		name: "",
		variant: "number",
		options: [],
	};
}

// Resets the addCustomFieldInputs to default
export function resetAddCustomFieldInputs() {
	addCustomFieldInputs.value = {
		name: "",
		variant: "number",
		options: [],
	};
}
