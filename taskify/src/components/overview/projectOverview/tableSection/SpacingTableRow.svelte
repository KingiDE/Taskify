<script lang="ts">
  import type { LocalProject } from "@components/types";

  let {
    currentProject,
  }: {
    currentProject: LocalProject;
  } = $props();
</script>

<tr class="h-5">
  <td class="border-gray-500 bg-gray-500"></td>
  <td class="border-gray-500 bg-gray-500"></td>
  <td class="border-gray-500 bg-gray-500"></td>
  <td class="border-gray-500 bg-gray-500"></td>
  <td class="border-gray-500 bg-gray-500"></td>
  <td class="border-gray-500 bg-gray-500"></td>
  {#each currentProject.customFields as customField}
    {#if customField.isVisible}
      <td class="border-gray-500 bg-gray-500"></td>
    {/if}
  {/each}
</tr>
