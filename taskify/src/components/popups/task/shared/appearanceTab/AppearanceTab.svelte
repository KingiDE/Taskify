<!-- The component that is shown when switching to the appearance-tab while editing a task. -->

<script lang="ts">
	import type { LocalProjectTask } from "@components/types";
	import CheckedSection from "./CheckedSection.svelte";
	import DescriptionSection from "./DescriptionSection.svelte";
	import TitleSection from "./TitleSection.svelte";

	let {
		task = $bindable(),
	}: {
		task: Omit<LocalProjectTask, "id">;
	} = $props();
</script>

<TitleSection bind:task />
<DescriptionSection bind:task />
<CheckedSection bind:task />
