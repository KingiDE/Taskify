import type { LocalProjectTask } from "@components/types";
import type { SearchFilters } from "../searchHandler";

export function doSizeOrDifficultyFilterMatch(
	searchFilters: SearchFilters,
	key: "size" | "difficulty",
	task: LocalProjectTask,
) {
	// Return if searchFilters[key] is enabled and doesn't match the task's value
	if (searchFilters[key].value !== null) {
		// If filter is inverted, the task's value mustn't be the same
		if (searchFilters[key].inverted && searchFilters[key].value === task[key])
			return false;

		// If filter is normal (= not inverted), the task's value must be the same
		if (!searchFilters[key].inverted && searchFilters[key].value !== task[key])
			return false;
	}

	return true;
}
