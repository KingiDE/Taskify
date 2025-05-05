import type {
	LocalProjectSortDirection,
	LocalProjectTask,
} from "@components/types";

// Flatten the nested object/array-structure and place nulls between
export function flattenTasks(
	sortedBy: string,
	sortDirection: LocalProjectSortDirection,
	groupedBy: string | null,
	tasks: Record<string | number, LocalProjectTask[]>,
) {
	const flattenedTasks: Array<LocalProjectTask | null> = [];

	// If sortedBy and groupedBy match, sorting inside one group has no use. Therfore, all groups get sorted by the sortedBy and sortDirection value:
	if (sortedBy === groupedBy) {
		const sortedKeys = Object.keys(tasks);

		// The keys inside the record-object get sorted and then accesses in the correct order to be then pushed.
		sortedKeys.sort((firstKey: string, secondKey: string) => {
			if (doesNeedSwap(firstKey, secondKey)) {
				return 1;
			}
			return -1;
		});

		function doesNeedSwap(a: string, b: string) {
			// Because booleans and null were converted to string before in groupHandler, they need to be checked now.

			if (sortDirection === "ascending") {
				// Handle earlier booleans
				if (a === "true" && b === "false") return true;

				// Handle earlier numbers
				const possibleANumber = Number(a);
				const possibleBNumber = Number(b);

				if (!Number.isNaN(possibleANumber) && !Number.isNaN(possibleBNumber)) {
					if (possibleANumber > possibleBNumber) return true;
				}

				// Handle earlier strings and nulls
				if (a !== "null" && b === "null") return true;
				return a > b;
			}
			// Handle earlier booleans
			if (a === "false" && b === "true") return true;

			// Handle earlier numbers
			const possibleANumber = Number(a);
			const possibleBNumber = Number(b);

			if (!Number.isNaN(possibleANumber) && !Number.isNaN(possibleBNumber)) {
				if (possibleANumber < possibleBNumber) return true;
			}

			// Handle earlier strings and nulls
			if (a === "null" && b !== "null") return true;
			return a < b;
		}

		for (const key of sortedKeys) {
			flattenedTasks.push(...tasks[key], null);
		}
	} else {
		Object.values(tasks).map((subarray) => {
			flattenedTasks.push(...subarray, null);
		});
	}

	// Remove last null
	flattenedTasks.pop();

	return flattenedTasks;
}
