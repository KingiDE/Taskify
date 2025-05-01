import type { LocalProjectCustomFieldInput } from "@components/types";

// Returns the corresponding Talwind-class for the box that marks the active variant custom field
export function getVariantBoxPosition(
  variant: "number" | "text" | "checkbox" | "select",
) {
  switch (variant) {
    case "number":
      return "left-0";
    case "text":
      return "left-[104px]";
    case "checkbox":
      return "left-[208px]";
    case "select":
      return "left-[312px]";
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
