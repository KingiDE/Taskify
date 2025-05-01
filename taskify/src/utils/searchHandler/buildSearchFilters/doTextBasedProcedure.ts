import { doubleDuoteFree } from "src/utils/stringUtils";
import type { SearchFilters } from "../searchHandler";

// Handles the logic when the filterKey is one of the following: "title", "description"
export function doTextBasedProcedure(
  filterKey: string,
  filterValue: string,
  inverted: boolean,
  mode: "like" | "not_like",
  searchFilters: SearchFilters,
) {
  filterValue = doubleDuoteFree(filterValue);

  // Sets mode to like when the filter ends with "*"
  const like = mode === "like";

  switch (filterKey) {
    case "title": {
      searchFilters.title.inverted = inverted;
      searchFilters.title.mode = like ? "like" : "exact";
      searchFilters.title.value = filterValue;

      break;
    }
    case "description": {
      searchFilters.description.inverted = inverted;
      searchFilters.description.mode = like ? "like" : "exact";
      searchFilters.description.value = filterValue;

      break;
    }
  }
}
