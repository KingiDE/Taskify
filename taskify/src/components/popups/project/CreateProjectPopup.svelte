<!-- This popup lets you create a project. -->

<script lang="ts">
	import type { LocalProject, PossiblePopups } from "@components/types";
	import Button from "@ui/Button.svelte";
	import FormSection from "../project/shared/FormSection.svelte";
	import BackgroundColorSection from "../project/shared/backgroundColorSection/BackgroundColorSection.svelte";
	import IconSection from "../project/shared/iconSection/IconSection.svelte";

	let {
		popup = $bindable(),
		addNewProject,
	}: {
		popup: PossiblePopups;
		addNewProject: (newProject: LocalProject) => void;
	} = $props();

	let createProjectInput = $state<Omit<LocalProject, "id">>({
		name: "",
		description: "",
		accentColor: null,
		icon: "idea",
		tasks: [],
		enabledFields: ["difficulty", "size"],
		customFields: [],
		searchQuery: "",
		sortedBy: "title",
		groupedBy: null,
		sortDirection: "ascending",
	});

	const invalidInputs = $derived.by(() => {
		return createProjectInput.name === "";
	});

	function createProject() {
		if (!invalidInputs) {
			addNewProject({
				id: Date.now().toString(),
				name: createProjectInput.name,
				description: createProjectInput.description,
				accentColor: createProjectInput.accentColor,
				icon: createProjectInput.icon,
				tasks: createProjectInput.tasks,
				enabledFields: createProjectInput.enabledFields,
				customFields: createProjectInput.customFields,
				searchQuery: createProjectInput.searchQuery,
				sortedBy: createProjectInput.sortedBy,
				groupedBy: createProjectInput.groupedBy,
				sortDirection: createProjectInput.sortDirection,
			});

			createProjectInput = {
				name: "",
				description: "",
				accentColor: null,
				icon: "idea",
				tasks: [],
				enabledFields: ["difficulty", "size"],
				customFields: [],
				searchQuery: "",
				sortedBy: "title",
				groupedBy: null,
				sortDirection: "ascending",
			};
			popup = null;
		}
	}
</script>

<div
	class="max-w-[575px] flex flex-col max-h-[700px] h-[calc(100dvh_-_48px)]"
	onkeydown={(e) => {
		if (e.key === "Enter" && document.activeElement?.tagName !== "TEXTAREA") {
			createProject();
		}
	}}
	role="button"
	tabindex={0}
>
	<h1 class="font-poppins font-bold text-2xl">Create new project</h1>
	<div class="mt-2 overflow-y-scroll pr-1.5">
		<FormSection bind:project={createProjectInput} />
		<BackgroundColorSection bind:project={createProjectInput} />
		<IconSection bind:project={createProjectInput} />
	</div>
	<div class="mt-auto grid">
		<Button
			meaning="positive"
			extraCSS="mt-4"
			onClick={createProject}
			disabled={invalidInputs}
		>
			{#snippet text()}
				Create
			{/snippet}
		</Button>
	</div>
</div>
