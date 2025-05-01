<!-- This component lets you select the icon of a project. -->

<script lang="ts">
  import type { LocalProject } from "@components/types";
  import { icons } from "@ui/icons";
  import IconButton from "./IconButton.svelte";

  let {
    project = $bindable(),
  }: {
    project: Omit<LocalProject, "id">;
  } = $props();
</script>

<div class="mt-2">
  Icon:
  <div class="mt-1 flex gap-2 flex-wrap">
    {#each Object.entries(icons) as [name]}
      <IconButton field={name as unknown as keyof typeof icons} bind:project />
    {/each}
  </div>
</div>
