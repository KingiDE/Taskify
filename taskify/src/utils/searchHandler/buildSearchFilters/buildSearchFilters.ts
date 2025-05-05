import { deepEqual } from "src/utils/objectUtils";
import { doubleDuoteFree } from "src/utils/stringUtils";
import type { SearchFilters } from "../searchHandler";
import { doCustomFieldProcedure } from "./doCustomFieldProcedure";
import { doPrebuiltOptionProcedure } from "./doPrebuiltOptionProcedure";
import { doRelationsFilterKeyProcedure } from "./doRelationsFilterKeyProcedure";
import { doTextBasedProcedure } from "./doTextBasedProcedure";
import { splitIntoSingleFilters } from "./splitIntoSingleFilters";

const defaultFilters: SearchFilters = {
	done: null,
	difficulty: {
		inverted: false,
		value: null,
	},
	size: {
		inverted: false,
		value: null,
	},
	title: {
		inverted: false,
		mode: "exact",
		value: null,
	},
	description: {
		inverted: false,
		mode: "exact",
		value: null,
	},
	relations: {
		inverted: false,
		mode: "exact",
		value: null,
	},
	customFields: [],
};

// Returns the filter object that is used to determine the tasks that are shown by taking the user's search query as argument.
export function buildSearchFilters(searchQuery: string) {
	// Initialze the object
	let searchFilters: SearchFilters = {
		title: { ...defaultFilters.title },
		description: { ...defaultFilters.description },
		difficulty: { ...defaultFilters.difficulty },
		size: { ...defaultFilters.size },
		done: defaultFilters.done,
		relations: { ...defaultFilters.relations },
		customFields: [],
	};

	// Split the given query by spaces and remove empty entries
	const singleQueries = splitIntoSingleFilters(searchQuery);

	for (const singleQuery of singleQueries) {
		modifySearchFilterAccordingToSingleQuery(singleQuery, searchFilters);
	}

	// If at the end the search filters are still unchanged, simple filters are applied:
	if (deepEqual(searchFilters, defaultFilters)) {
		searchFilters = {
			title: {
				inverted: false,
				mode: "like",
				value: searchQuery,
			},
			description: { ...defaultFilters.description },
			difficulty: { ...defaultFilters.difficulty },
			size: { ...defaultFilters.size },
			done: null,
			relations: { ...defaultFilters.relations },
			customFields: [],
		};
	}

	return searchFilters;
}

// Takes in a single query and calls subfunctions to handle the logic according to the filterKey and operator
function modifySearchFilterAccordingToSingleQuery(
	query: string,
	searchFilters: SearchFilters,
) {
	// Calls all subfunctions for filterKeys that can use the "=="-operator
	const doubleEqualSplit = query.split("==");

	if (doubleEqualSplit.length === 2) {
		if (["done", "difficulty", "size"].includes(doubleEqualSplit[0])) {
			doPrebuiltOptionProcedure(
				doubleEqualSplit[0],
				doubleEqualSplit[1],
				false,
				searchFilters,
			);
		} else if (["title", "description"].includes(doubleEqualSplit[0])) {
			doTextBasedProcedure(
				doubleEqualSplit[0],
				doubleEqualSplit[1],
				false,
				"not_like",
				searchFilters,
			);
		} else if (["relations"].includes(doubleEqualSplit[0])) {
			doRelationsFilterKeyProcedure(
				doubleEqualSplit[1],
				false,
				"exact",
				searchFilters,
			);
		} else {
			doCustomFieldProcedure(
				doubleDuoteFree(doubleEqualSplit[0]),
				doubleEqualSplit[1],
				"equals",
				searchFilters,
			);
		}
	}

	// Calls all subfunctions for filterKeys that can use the "!="-operator
	const notEqualSplit = query.split("!=");

	if (notEqualSplit.length === 2) {
		if (["done", "difficulty", "size"].includes(notEqualSplit[0])) {
			doPrebuiltOptionProcedure(
				notEqualSplit[0],
				notEqualSplit[1],
				true,
				searchFilters,
			);
		} else if (["title", "description"].includes(notEqualSplit[0])) {
			doTextBasedProcedure(
				notEqualSplit[0],
				notEqualSplit[1],
				true,
				"not_like",
				searchFilters,
			);
		} else if (["relations"].includes(doubleEqualSplit[0])) {
			doRelationsFilterKeyProcedure(
				doubleEqualSplit[1],
				true,
				"exact",
				searchFilters,
			);
		} else {
			doCustomFieldProcedure(
				doubleDuoteFree(notEqualSplit[0]),
				notEqualSplit[1],
				"not_equals",
				searchFilters,
			);
		}
	}

	// Calls all subfunctions for filterKeys that can use the "=<"-operator
	const lowerThanSplit = query.split("=<");

	if (lowerThanSplit.length === 2) {
		if (["relations"].includes(lowerThanSplit[0])) {
			doRelationsFilterKeyProcedure(
				lowerThanSplit[1],
				false,
				"lower_than",
				searchFilters,
			);
		} else {
			doCustomFieldProcedure(
				doubleDuoteFree(lowerThanSplit[0]),
				lowerThanSplit[1],
				"lower_than",
				searchFilters,
			);
		}
	}

	// Calls all subfunctions for filterKeys that can use the "=>"-operator
	const greaterThanSplit = query.split("=>");

	if (greaterThanSplit.length === 2) {
		if (["relations"].includes(greaterThanSplit[0])) {
			doRelationsFilterKeyProcedure(
				greaterThanSplit[1],
				false,
				"greater_than",
				searchFilters,
			);
		} else {
			doCustomFieldProcedure(
				doubleDuoteFree(greaterThanSplit[0]),
				greaterThanSplit[1],
				"greater_than",
				searchFilters,
			);
		}
	}

	// Calls all subfunctions for filterKeys that can use the "!<"-operator
	const notLowerThanSplit = query.split("!<");

	if (notLowerThanSplit.length === 2) {
		if (["relations"].includes(notLowerThanSplit[0])) {
			doRelationsFilterKeyProcedure(
				notLowerThanSplit[1],
				true,
				"lower_than",
				searchFilters,
			);
		} else {
			doCustomFieldProcedure(
				doubleDuoteFree(notLowerThanSplit[0]),
				notLowerThanSplit[1],
				"not_lower_than",
				searchFilters,
			);
		}
	}

	// Calls all subfunctions for filterKeys that can use the "!>"-operator
	const notGreaterThanSplit = query.split("!>");

	if (notGreaterThanSplit.length === 2) {
		if (["relations"].includes(notGreaterThanSplit[0])) {
			doRelationsFilterKeyProcedure(
				notGreaterThanSplit[1],
				true,
				"greater_than",
				searchFilters,
			);
		} else {
			doCustomFieldProcedure(
				doubleDuoteFree(notGreaterThanSplit[0]),
				notGreaterThanSplit[1],
				"not_greater_than",
				searchFilters,
			);
		}
	}

	// Calls all subfunctions for filterKeys that can use the "=*"-operator
	const likeSplit = query.split("=*");

	if (likeSplit.length === 2) {
		if (["title", "description"].includes(likeSplit[0])) {
			doTextBasedProcedure(
				likeSplit[0],
				likeSplit[1],
				false,
				"like",
				searchFilters,
			);
		} else {
			doCustomFieldProcedure(
				doubleDuoteFree(likeSplit[0]),
				likeSplit[1],
				"like",
				searchFilters,
			);
		}
	}

	// Calls all subfunctions for filterKeys that can use the "!*"-operator
	const notLikeSplit = query.split("!*");

	if (notLikeSplit.length === 2) {
		if (["title", "description"].includes(notLikeSplit[0])) {
			doTextBasedProcedure(
				notLikeSplit[0],
				notLikeSplit[1],
				true,
				"like",
				searchFilters,
			);
		} else {
			doCustomFieldProcedure(
				doubleDuoteFree(notLikeSplit[0]),
				notLikeSplit[1],
				"not_like",
				searchFilters,
			);
		}
	}
}
