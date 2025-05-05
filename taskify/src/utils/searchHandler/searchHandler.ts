import type {
	LocalProjectCustomField,
	LocalProjectTask,
} from "@components/types";
import { applyFiltersOnTasks } from "./applyFiltersOnTasks/applyFiltersOnTasks";
import { buildSearchFilters } from "./buildSearchFilters/buildSearchFilters";

export type SearchFilters = {
	done: null | boolean;
	difficulty: {
		inverted: boolean;
		value: null | "easy" | "medium" | "hard";
	};
	size: {
		inverted: boolean;
		value: null | "small" | "medium" | "large";
	};
	title: {
		inverted: boolean;
		mode: "exact" | "like";
		value: null | string;
	};
	description: {
		inverted: boolean;
		mode: "exact" | "like";
		value: null | string;
	};
	relations: {
		inverted: boolean;
		mode: "lower_than" | "greater_than" | "exact";
		value: null | number;
	};
	customFields: Array<{
		filterKey: string;
		filterValue: string;
		operator:
			| "equals"
			| "not_equals"
			| "lower_than"
			| "not_lower_than"
			| "greater_than"
			| "not_greater_than"
			| "like"
			| "not_like";
	}>;
};

export function filterTasksBySearchQuery(
	searchQuery: string,
	tasks: Array<LocalProjectTask>,
	projectsCustomFields: Array<LocalProjectCustomField>,
) {
	if (searchQuery === "") return tasks;

	return applyFiltersOnTasks(
		tasks,
		buildSearchFilters(searchQuery),
		projectsCustomFields,
	);
}
