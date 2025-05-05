<script lang="ts">
import type { PossiblePopups } from "@components/types";
import Icon from "@ui/Icon.svelte";
import Input from "@ui/Input.svelte";
import { onMount } from "svelte";

// biome-ignore lint/style/useConst: These are props and work like this
let {
	popup,
	searchQuery = $bindable(),
	hideAnySubpopup,
}: {
	popup: PossiblePopups;
	searchQuery: string;
	hideAnySubpopup: () => void;
} = $props();

// biome-ignore lint/style/useConst: <explanation>
let searchbar = $state<HTMLInputElement | null>(null);

onMount(() => {
	// Moving into seperate function to be able to remove later
	function handleF(e: KeyboardEvent) {
		// If an input is already focused, hotkeys don't work
		if (document.activeElement?.tagName === "INPUT") return;

		if (e.key === "F" && searchbar && popup === null) {
			searchbar.focus();
			hideAnySubpopup();
			// Cancels the event
			e.preventDefault();
		}
	}

	document.addEventListener("keydown", handleF);

	return () => {
		document.removeEventListener("keydown", handleF);
	};
});
</script>

<div class="mt-8 relative">
	<Icon
		name="search"
		variant="rounded"
		width={24}
		height={24}
		extraCSS="absolute top-1/2 -translate-y-1/2 left-2"
	/>
	<Input
		bind:searchbar
		placeholder="Search by typing the name or use operators"
		getter={() => searchQuery}
		setter={(newValue) => (searchQuery = newValue)}
		onFocus={hideAnySubpopup}
		inputExtraCSS="pl-10 bg-gray-700 max-w-[500px]"
	/>
</div>
