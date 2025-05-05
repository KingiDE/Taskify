import type {
	LocalProject,
	LocalProjectCustomField,
	LocalProjectTask,
} from "@components/types";
import { doubleDuoteFree } from "src/utils/stringUtils";
import type { SearchFilters } from "../searchHandler";

export function doCustomFieldsFilterMatch(
	searchFilters: SearchFilters,
	task: LocalProjectTask,
	projectsCustomFields: Array<LocalProjectCustomField>,
) {
	let atLeastOneMismatch = false;

	// Check for each filter in searchFilters.customFields if the actual value is correct
	searchFilters.customFields.map(({ filterKey, filterValue, operator }) => {
		filterValue = doubleDuoteFree(filterValue);

		// Convert the custom field's name that is given as filterKey to an id with the help of projectsCustomFields.
		// If this conversion fails, the function will return false.
		const storedCustomFieldId = projectsCustomFields.find((el) => {
			return el.name === filterKey;
		});

		if (!storedCustomFieldId) return false;

		const taskFilterValue = task.customFields.find((el) => {
			return el.id === storedCustomFieldId.id;
		});

		// If the filterKey doesn't exist inside the task, the function returns false.
		if (!taskFilterValue) return false;

		// If the operator is "equals", the stored value and passed filterValue must match.
		if (operator === "equals") {
			// Leaving out triple equals because the input string should match stored numbers.
			// biome-ignore lint/suspicious/noDoubleEquals: <explanation>
			if (taskFilterValue.value != filterValue) atLeastOneMismatch = true;
			return;
		}

		// If the operator is "not_equals", the stored value and passed filterValue mustn't match.
		if (operator === "not_equals") {
			// Leaving out triple equals because the input string should match stored numbers.
			// biome-ignore lint/suspicious/noDoubleEquals: <explanation>
			if (taskFilterValue.value == filterValue) atLeastOneMismatch = true;
			return;
		}

		// If the operator is "greater_than", the stored value must be greater than the filterValue.
		if (operator === "greater_than") {
			const filterValueAsNumber = Number(filterValue);
			const taskFilterValueAsNumber = Number(taskFilterValue.value);

			if (
				Number.isNaN(filterValueAsNumber) ||
				Number.isNaN(taskFilterValueAsNumber)
			) {
				atLeastOneMismatch = true;
				return;
			}

			if (taskFilterValueAsNumber <= filterValueAsNumber) {
				atLeastOneMismatch = true;
				return;
			}
		}

		// If the operator is "not_greater_than", the stored value mustn't be greater than the filterValue.
		if (operator === "not_greater_than") {
			const filterValueAsNumber = Number(filterValue);
			const taskFilterValueAsNumber = Number(taskFilterValue.value);

			if (
				Number.isNaN(filterValueAsNumber) ||
				Number.isNaN(taskFilterValueAsNumber)
			) {
				atLeastOneMismatch = true;
				return;
			}

			if (taskFilterValueAsNumber > filterValueAsNumber) {
				atLeastOneMismatch = true;
				return;
			}
		}

		// If the operator is "lower_than", the stored value must be lower than the filterValue.
		if (operator === "lower_than") {
			const filterValueAsNumber = Number(filterValue);
			const taskFilterValueAsNumber = Number(taskFilterValue.value);

			if (
				Number.isNaN(filterValueAsNumber) ||
				Number.isNaN(taskFilterValueAsNumber)
			) {
				atLeastOneMismatch = true;
				return;
			}

			if (taskFilterValueAsNumber >= filterValueAsNumber) {
				atLeastOneMismatch = true;
				return;
			}
		}

		// If the operator is "not_lower_than", the stored value mustn't be lower than the filterValue.
		if (operator === "not_lower_than") {
			const filterValueAsNumber = Number(filterValue);
			const taskFilterValueAsNumber = Number(taskFilterValue.value);

			if (
				Number.isNaN(filterValueAsNumber) ||
				Number.isNaN(taskFilterValueAsNumber)
			) {
				atLeastOneMismatch = true;
				return;
			}

			if (taskFilterValueAsNumber < filterValueAsNumber) {
				atLeastOneMismatch = true;
				return;
			}
		}

		// If the operator is "like", the stored value must include the filterValue.
		if (operator === "like") {
			if (
				typeof taskFilterValue.value !== "string" ||
				!taskFilterValue.value.includes(filterValue)
			) {
				atLeastOneMismatch = true;
				return;
			}
		}

		// If the operator is "not_like", the stored value mustn't include the filterValue.
		if (operator === "not_like") {
			if (
				typeof taskFilterValue.value !== "string" ||
				taskFilterValue.value.includes(filterValue)
			) {
				atLeastOneMismatch = true;
				return;
			}
		}
	});

	return !atLeastOneMismatch;
}
