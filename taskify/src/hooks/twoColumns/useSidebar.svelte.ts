import type { PossiblePopups } from "@components/types";

// Stores whether the sidebar is expanded
export const isSidebarExpanded = $state<{ value: boolean }>({
  value: false,
});

// Toggles the expanded-state of the sidebar if the current popup isn't null
export function toggleIsSidebarExpanded(popup: PossiblePopups) {
  if (popup !== null) return;
  isSidebarExpanded.value = !isSidebarExpanded.value;
}
