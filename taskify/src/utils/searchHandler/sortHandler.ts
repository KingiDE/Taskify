import type {
	LocalProjectSortDirection,
	LocalProjectTask,
} from "@components/types";

export function sortTasksByProjectSettings(
	property: string,
	direction: LocalProjectSortDirection,
	oldTasks: Record<string | number, LocalProjectTask[]>,
) {
	const tasks: Record<string | number, LocalProjectTask[]> = {};

	Object.keys(oldTasks).map((el) => {
		tasks[el] = [...(oldTasks[el] as LocalProjectTask[])];
	});

	function doesNeedSwap(a: LocalProjectTask, b: LocalProjectTask) {
		if (direction === "ascending") {
			if (property === "title" || property === "description") {
				if (b[property].localeCompare(a[property]) < 0) return true;
			} else if (property === "done") {
				if (!b.isChecked && a.isChecked) return true;
			} else if (property === "size") {
				if (mapSizeToNumber(b) < mapSizeToNumber(a)) return true;
			} else if (property === "difficulty") {
				if (mapDifficultyToNumber(b) < mapDifficultyToNumber(a)) return true;
			} else if (property === "relations") {
				if (b.childTasks.length < a.childTasks.length) return true;
			} else {
				const aValue = a.customFields.find((el) => el.id === property);
				const bValue = b.customFields.find((el) => el.id === property);

				if (
					aValue !== undefined &&
					bValue !== undefined &&
					aValue.value !== null &&
					bValue.value !== null
				) {
					// If both values can be converted to numbers, then this comparison will overrule the later one as it makes more sense.
					const possibleANumber = Number(aValue.value);
					const possibleBNumber = Number(bValue.value);

					if (
						!Number.isNaN(possibleANumber) &&
						!Number.isNaN(possibleBNumber)
					) {
						if (possibleANumber > possibleBNumber) return true;
						if (possibleANumber < possibleBNumber) return false;
					}

					if (bValue.value < aValue.value) return true;
				}
			}
		} else {
			if (property === "title" || property === "description") {
				if (a[property].localeCompare(b[property]) < 0) return true;
			} else if (property === "done") {
				if (b.isChecked && !a.isChecked) return true;
			} else if (property === "size") {
				if (mapSizeToNumber(b) > mapSizeToNumber(a)) return true;
			} else if (property === "difficulty") {
				if (mapDifficultyToNumber(b) > mapDifficultyToNumber(a)) return true;
			} else if (property === "relations") {
				if (b.childTasks.length > a.childTasks.length) return true;
			} else {
				const aValue = a.customFields.find((el) => el.id === property);
				const bValue = b.customFields.find((el) => el.id === property);

				if (
					aValue !== undefined &&
					bValue !== undefined &&
					aValue.value !== null &&
					bValue.value !== null
				) {
					// If both values can be converted to numbers, then this comparison will overrule the later one as it makes more sense.
					const possibleANumber = Number(aValue.value);
					const possibleBNumber = Number(bValue.value);

					if (
						!Number.isNaN(possibleANumber) &&
						!Number.isNaN(possibleBNumber)
					) {
						if (possibleANumber < possibleBNumber) return true;
						if (possibleANumber > possibleBNumber) return false;
					}

					if (bValue.value > aValue.value) return true;
				}
			}
		}

		return false;
	}

	Object.values(tasks).map((subarray) => {
		// negative value if the first argument is less than the second argument
		subarray.sort((a: LocalProjectTask, b: LocalProjectTask) => {
			if (doesNeedSwap(a, b)) return 1;

			return -1;
		});
	});

	return tasks;
}

function mapSizeToNumber(task: LocalProjectTask) {
	if (task.size === "medium") return 1;
	if (task.size === "large") return 2;
	return 0;
}

function mapDifficultyToNumber(task: LocalProjectTask) {
	if (task.difficulty === "medium") return 1;
	if (task.difficulty === "hard") return 2;
	return 0;
}
