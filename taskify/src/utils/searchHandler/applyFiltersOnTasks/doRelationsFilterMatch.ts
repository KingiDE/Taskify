import type { LocalProjectTask } from "@components/types";
import type { SearchFilters } from "../searchHandler";

export function doRelationsFilterMatch(
  searchFilters: SearchFilters,
  task: LocalProjectTask,
) {
  // Return if searchFilters.relations is enabled and doesn't match the task's value
  if (searchFilters.relations.value !== null) {
    // Return if searchFilters.relations is not inverted, set to "exact" and the values don't equal
    if (
      !searchFilters.relations.inverted &&
      searchFilters.relations.mode === "exact" &&
      searchFilters.relations.value !== task.childTasks.length
    )
      return;

    // Return if searchFilters.relations is not inverted, set to "greater_than" and the task's value is not greater
    if (
      !searchFilters.relations.inverted &&
      searchFilters.relations.mode === "greater_than" &&
      searchFilters.relations.value <= task.childTasks.length
    )
      return;

    // Return if searchFilters.relations is not inverted, set to "greater_than" and the task's value is not lower
    if (
      !searchFilters.relations.inverted &&
      searchFilters.relations.mode === "lower_than" &&
      searchFilters.relations.value >= task.childTasks.length
    )
      return;

    // Return if searchFilters.relations is inverted, set to "exact" and the values equal
    if (
      searchFilters.relations.inverted &&
      searchFilters.relations.mode === "exact" &&
      searchFilters.relations.value === task.childTasks.length
    )
      return;

    // Return if searchFilters.relations is inverted, set to "greater_than" and the task's value is greater
    if (
      searchFilters.relations.inverted &&
      searchFilters.relations.mode === "greater_than" &&
      searchFilters.relations.value > task.childTasks.length
    )
      return;

    // Return if searchFilters.relations is inverted, set to "greater_than" and the task's value is lower
    if (
      searchFilters.relations.inverted &&
      searchFilters.relations.mode === "lower_than" &&
      searchFilters.relations.value < task.childTasks.length
    )
      return;
  }

  return true;
}
