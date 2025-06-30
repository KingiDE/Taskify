<!-- This component is the entire second column inside the TwoColumns component. -->

<script lang="ts">
	import type {
		LocalProject,
		LocalProjectTask,
		PossiblePopups,
	} from "@components/types";
	import NoProjectSelected from "./NoProjectSelected.svelte";
	import ProjectOverview from "./projectOverview/ProjectOverview.svelte";

	// biome-ignore lint/style/useConst: These are props and work like this
	let {
		currentProject,
		popup = $bindable(),
		currentTask = $bindable(),
	}: {
		currentProject: LocalProject | null;
		popup: PossiblePopups;
		currentTask: LocalProjectTask | null;
	} = $props();
</script>

<div class="h-full">
	{#if currentProject === null}
		<NoProjectSelected />
	{:else}
		<ProjectOverview bind:currentProject bind:popup bind:currentTask />
	{/if}
</div>
