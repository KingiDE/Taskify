import type {
  LocalProjectCustomField,
  LocalProjectCustomFieldInput,
} from "@components/types";
import { optimizeOptionsArray } from "src/utils/customFieldsInput";

// Everytime a custom field is edited inside a project, its edited values will be stored in this state
// and the updated seperately to avoid type conflicts.
export const editCustomFieldInputs = $state<{
  value: LocalProjectCustomFieldInput;
}>({
  value: {
    name: "",
    variant: "number",
    options: [],
  },
});

// This function is called on the first render and updates the input according to values of the edited field.
export function initializeInputs(currentCustomField: LocalProjectCustomField) {
  editCustomFieldInputs.value = {
    name: currentCustomField.name,
    options: currentCustomField.options ? currentCustomField.options : [],
    variant: currentCustomField.variant,
  };
}

// Located in utils to allow shared behaviour with addEditCustomField.svelte.ts
export function updateInputsFieldsInSelectEffect() {
  optimizeOptionsArray(editCustomFieldInputs.value);
}
