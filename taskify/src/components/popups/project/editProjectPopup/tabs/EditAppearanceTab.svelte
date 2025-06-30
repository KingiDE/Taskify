<!-- This component wraps the components to edit the appearance of a project. -->

<script lang="ts">
import type { LocalProject } from "@components/types";
import FormSection from "../../shared/FormSection.svelte";
import BackgroundColorSection from "../../shared/backgroundColorSection/BackgroundColorSection.svelte";
import IconSection from "../../shared/iconSection/IconSection.svelte";

// biome-ignore lint/style/useConst: These are props and work like this
let {
	currentProject = $bindable(),
}: {
	currentProject: LocalProject;
} = $props();
</script>

<FormSection bind:project={currentProject} />
<BackgroundColorSection bind:project={currentProject} />
<IconSection bind:project={currentProject} />
