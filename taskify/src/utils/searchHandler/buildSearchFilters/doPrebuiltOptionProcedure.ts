import type { SearchFilters } from "../searchHandler";

// Handles the logic when the filterKey is one of the following: "done", "difficulty" or "size"
export function doPrebuiltOptionProcedure(
	filterKey: string,
	filterValue: string,
	inverted: boolean,
	searchFilters: SearchFilters,
) {
	switch (filterKey) {
		case "done": {
			if (filterValue === "true") {
				searchFilters.done = !inverted;
			} else if (filterValue === "false") {
				searchFilters.done = inverted;
			}

			break;
		}
		case "size": {
			searchFilters.size.inverted = inverted;

			// Sets the value in searchFilters to the corresponding filterValue
			if (filterValue === "small") {
				searchFilters.size.value = "small";
			} else if (filterValue === "medium") {
				searchFilters.size.value = "medium";
			} else if (filterValue === "large") {
				searchFilters.size.value = "large";
			}

			break;
		}
		case "difficulty": {
			searchFilters.size.inverted = inverted;

			// Sets the value in searchFilters to the corresponding filterValue
			if (filterValue === "easy") {
				searchFilters.difficulty.value = "easy";
			} else if (filterValue === "medium") {
				searchFilters.difficulty.value = "medium";
			} else if (filterValue === "hard") {
				searchFilters.difficulty.value = "hard";
			}

			break;
		}
	}
}
