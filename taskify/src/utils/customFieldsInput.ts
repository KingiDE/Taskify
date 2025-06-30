import type { LocalProjectCustomFieldInput } from "@components/types";

// Returns the corresponding index for the box that marks the active variant custom field
export function getVariantBoxPosition(variant: "number" | "text" | "checkbox" | "select") {
	if (variant === "number") {
		return 0;
	} else if (variant === "text") {
		return 1;
	} else if (variant === "checkbox") {
		return 2;
	} else {
		return 3;
	}
}

// Removes all empty fields from the given array but adds one emtpy element at the end
export function optimizeOptionsArray(
	customFieldInputs: LocalProjectCustomFieldInput,
) {
	if (customFieldInputs.options.length === 0) {
		customFieldInputs.options = [""];
	} else if (customFieldInputs.options.every((option) => option !== "")) {
		customFieldInputs.options = [...customFieldInputs.options, ""];
	} else if (
		customFieldInputs.options.filter((option) => option === "").length > 1
	) {
		const emptyCount = customFieldInputs.options.filter(
			(option) => option === "",
		).length;
		customFieldInputs.options = [
			...customFieldInputs.options.filter((option) => option !== ""),
			"",
		].slice(0, emptyCount + 1);
	}
}
