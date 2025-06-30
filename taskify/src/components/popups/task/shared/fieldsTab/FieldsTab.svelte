<!-- The component that is shown when switching to the fields-tab while editing a task. -->

<script lang="ts">
	import type { LocalProject, LocalProjectTask } from "@components/types";
	import DifficultySection from "./DifficultySection.svelte";
	import SizeSection from "./SizeSection.svelte";
	import CustomFieldsSection from "./customFieldsSection/CustomFieldsSection.svelte";

	// biome-ignore lint/style/useConst: These are props and work like this
	let {
		task = $bindable(),
		currentProject,
	}: {
		task: Omit<LocalProjectTask, "id">;
		currentProject: LocalProject;
	} = $props();
</script>

<DifficultySection bind:task />
<SizeSection bind:task />
<CustomFieldsSection bind:task {currentProject} />
