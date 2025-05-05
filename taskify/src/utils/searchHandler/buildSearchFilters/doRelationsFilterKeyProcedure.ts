import type { SearchFilters } from "../searchHandler";

export function doRelationsFilterKeyProcedure(
	filterValue: string,
	inverted: boolean,
	operator: "lower_than" | "greater_than" | "exact",
	searchFilters: SearchFilters,
) {
	const possibleNumber = Number(filterValue);

	if (!Number.isNaN(possibleNumber)) {
		searchFilters.relations.inverted = inverted;
		searchFilters.relations.value = possibleNumber;
		searchFilters.relations.mode = operator;
	}
}
