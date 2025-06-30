<!-- This component is the head of the table. -->

<script lang="ts">
  import type { LocalProject } from "@components/types";

  const {
    currentProject,
  }: {
    currentProject: LocalProject;
  } = $props();
</script>

<thead>
  <tr class="bg-gray-700">
    <th class="min-w-[125px] border-gray-500">Title</th>
    <th class="min-w-[150px] border-gray-500">Description</th>
    {#if currentProject.enabledFields.includes("difficulty")}
      <th class="w-[125px] border-gray-500">Difficulty</th>
    {/if}
    {#if currentProject.enabledFields.includes("size")}
      <th class="w-[125px] border-gray-500">Size</th>
    {/if}
    {#each currentProject.customFields as customField}
      {#if customField.isVisible}
        <th class="border-gray-500">{customField.name}</th>
      {/if}
    {/each}
    <th class="w-[100px] border-gray-500">Done</th>
    <th class="w-[100px] border-gray-500">Delete</th>
  </tr>
</thead>
