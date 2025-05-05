import type { SearchFilters } from "../searchHandler";

export function doCustomFieldProcedure(
	filterKey: string,
	filterValue: string,
	operator:
		| "equals"
		| "not_equals"
		| "lower_than"
		| "not_lower_than"
		| "greater_than"
		| "not_greater_than"
		| "like"
		| "not_like",
	searchFilters: SearchFilters,
) {
	searchFilters.customFields.push({
		filterKey,
		filterValue,
		operator,
	});
}
