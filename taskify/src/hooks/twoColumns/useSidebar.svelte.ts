import type { PossiblePopups } from "@components/types";

// Stores whether the sidebar is expanded
// biome-ignore lint/style/useConst: <explanation>
export let isSidebarExpanded = $state<{ value: boolean }>({
	value: false,
});

// Toggles the expanded-state of the sidebar if the current popup isn't null
export function toggleIsSidebarExpanded(popup: PossiblePopups) {
	if (popup !== null) return;
	isSidebarExpanded.value = !isSidebarExpanded.value;
}
