<!-- The component that shows the values of default-fields inside the relation-tab. -->

<script lang="ts">
  import { fade } from "svelte/transition";
  import type { LocalProject, LocalProjectTask } from "@components/types";

  let {
    currentProject,
    subtask,
    showInfoScreen,
  }: {
    currentProject: LocalProject;
    subtask: LocalProjectTask;
    showInfoScreen: boolean;
  } = $props();

  function mapSizeToPrettyValue(size: "small" | "medium" | "large") {
    switch (size) {
      case "small":
        return "🟢 Small";
      case "medium":
        return "🟡 Medium";
      case "large":
        return "🔴 Large";
    }
  }

  function mapDifficultyToPrettyValue(difficulty: "easy" | "medium" | "hard") {
    switch (difficulty) {
      case "easy":
        return "🧨 Easy";
      case "medium":
        return "💣 Medium";
      case "hard":
        return "☢️ Hard";
    }
  }

  function mapCustomFieldIdToName(id: string) {
    const customField = currentProject.customFields.find((el) => el.id === id);

    if (customField === undefined) {
      return id;
    } else {
      return customField.name;
    }
  }
</script>

{#if showInfoScreen}
  <div
    transition:fade={{ duration: 100 }}
    class="min-h-[100px] min-w-[200px] z-10 bg-gray-800 -outline-offset-1 outline-1 outline-gray-500 rounded-md py-2 px-3 absolute left-0 top-[calc(100%_+_4px)]"
  >
    {subtask.title}
    <div class="opacity-75">
      {subtask.description}
    </div>
    <div class="mt-1">
      Size: {mapSizeToPrettyValue(subtask.size)}
    </div>
    <div>
      Difficulty: {mapDifficultyToPrettyValue(subtask.difficulty)}
    </div>
    {#each subtask.customFields as customField}
      {#if customField.value !== "" && customField.value !== null}
        <div>
          {mapCustomFieldIdToName(customField.id)}: {customField.value}
        </div>
      {/if}
    {/each}
    <div class="mt-1">
      Relations: {subtask.childTasks.length}
    </div>
  </div>
{/if}
