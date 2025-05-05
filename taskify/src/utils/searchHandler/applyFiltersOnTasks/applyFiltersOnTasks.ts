import type {
	LocalProject,
	LocalProjectCustomField,
	LocalProjectTask,
} from "@components/types";
import type { SearchFilters } from "../searchHandler";
import { doCustomFieldsFilterMatch } from "./doCustomFieldsFilterMatch";
import { doRelationsFilterMatch } from "./doRelationsFilterMatch";
import { doSizeOrDifficultyFilterMatch } from "./doSizeOrDifficultyFilterMatch";
import { doTitleOrDescriptionFilterMatch } from "./doTitleOrDescriptionFilterMatch";

export function applyFiltersOnTasks(
	tasks: Array<LocalProjectTask>,
	searchFilters: SearchFilters,
	projectsCustomFields: Array<LocalProjectCustomField>,
) {
	return tasks.filter((task) => {
		// Return if searchFilters.done is enabled and doesn't match task.isChecked
		if (searchFilters.done !== null && task.isChecked !== searchFilters.done)
			return;

		if (!doSizeOrDifficultyFilterMatch(searchFilters, "size", task)) return;
		if (!doSizeOrDifficultyFilterMatch(searchFilters, "difficulty", task))
			return;

		if (!doTitleOrDescriptionFilterMatch(searchFilters, "title", task)) return;
		if (!doTitleOrDescriptionFilterMatch(searchFilters, "description", task))
			return;

		if (!doRelationsFilterMatch(searchFilters, task)) return;

		if (!doCustomFieldsFilterMatch(searchFilters, task, projectsCustomFields))
			return;

		return task;
	});
}
