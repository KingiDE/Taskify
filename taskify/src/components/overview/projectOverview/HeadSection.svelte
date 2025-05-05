<!-- This component lets you open the edit-project-popup and display the title of a project. -->

<script lang="ts">
import type { LocalProject, PossiblePopups } from "@components/types";
import Button from "@ui/Button.svelte";
import Icon from "@ui/Icon.svelte";

let {
	popup = $bindable(),
	currentProject,
}: {
	popup: PossiblePopups;
	currentProject: LocalProject;
} = $props();

function wantToEditProject() {
	popup = "edit_project";
}
</script>

<div class="flex gap-4 items-center">
  <Button meaning="neutral" onClick={wantToEditProject}>
    {#snippet icon()}
      <Icon name="edit" variant="rounded" height={24} width={24} />
    {/snippet}
  </Button>
  <h1 class="text-2xl font-poppins font-bold">{currentProject.name}</h1>
</div>
