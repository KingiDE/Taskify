<!-- This component wraps the components to edit the appearence of a project. -->

<script lang="ts">
  import type { LocalProject } from "@components/types";
  import FormSection from "../../shared/FormSection.svelte";
  import IconSection from "../../shared/iconSection/IconSection.svelte";
  import BackgroundColorSection from "../../shared/backgroundColorSection/BackgroundColorSection.svelte";

  let {
    currentProject = $bindable(),
  }: {
    currentProject: LocalProject;
  } = $props();
</script>

<FormSection bind:project={currentProject} />
<BackgroundColorSection bind:project={currentProject} />
<IconSection bind:project={currentProject} />
