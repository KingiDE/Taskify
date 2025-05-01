import type { LocalProjectTask } from "@components/types";
import { type SearchFilters } from "../searchHandler";

export function doTitleOrDescriptionFilterMatch(
  searchFilters: SearchFilters,
  key: "title" | "description",
  task: LocalProjectTask,
) {
  // Return if searchFilters[key] is enabled and doesn't match the task's value according to the key's mode
  if (searchFilters[key].value !== null) {
    // If filter is inverted, the task-value mustn't be the same
    if (searchFilters[key].inverted) {
      // Return if mode is set to exact and the values exactly match
      if (
        searchFilters[key].mode === "exact" &&
        doMatchCaseInsensitive(searchFilters[key].value, task[key])
      )
        return false;

      // Return if mode is set to "like" and the key includes the filter-value
      if (
        searchFilters[key].mode === "like" &&
        doesCaseInsensitiveInclude(task[key], searchFilters[key].value)
      )
        return false;
    }

    // If filter is normal (= not inverted), the task's value must be the same
    if (!searchFilters[key].inverted) {
      // Return if mode is set to exact and the values don't match
      if (
        searchFilters[key].mode === "exact" &&
        !doMatchCaseInsensitive(searchFilters[key].value, task[key])
      )
        return false;

      // Return if mode is set to "like" and the key doesn't include the filter-value
      if (
        searchFilters[key].mode === "like" &&
        !doesCaseInsensitiveInclude(task[key], searchFilters[key].value)
      )
        return false;
    }
  }

  return true;
}

// Checks if the second string is included in the first string
function doesCaseInsensitiveInclude(first: string, second: string) {
  for (let i = 0; i < first.length - second.length + 1; i++) {
    let innerMatch = true;

    for (let j = 0; j < second.length; j++) {
      if (
        !doMatchCaseInsensitive(first[i + j], second[j]) ||
        first[i + j] !== second[j]
      )
        innerMatch = false;
    }

    if (innerMatch) return true;
  }

  return false;
}

// Checks if both string match when ignoring captial and lowercase letters
function doMatchCaseInsensitive(first: string, second: string) {
  if (first.length !== second.length) return false;

  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i] && first[i] !== getCaseInvertedChar(second[i]))
      return false;
  }

  return true;
}

function getCaseInvertedChar(char: string) {
  if (char.length !== 1) return char;

  if (char === char.toUpperCase()) {
    return char.toLowerCase();
  } else {
    return char.toUpperCase();
  }
}
