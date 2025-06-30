<!-- The component for single search-results of possible relations in the relations-tab. -->

<script lang="ts">
  import type {
    LocalProject,
    LocalProjectTask,
    PossibleEditTaskPopupTabs,
  } from "@components/types";
  import Button from "@ui/Button.svelte";
  import Icon from "@ui/Icon.svelte";
  import InfoScreen from "./InfoScreen.svelte";

  let {
    currentProject,
    currentTab = $bindable(),
    switchToTask,
    subtask,
    hasMargin,
    variant,
    onClick,
  }: {
    currentProject: LocalProject;
    currentTab: PossibleEditTaskPopupTabs;
    switchToTask: (task: LocalProjectTask) => void;
    hasMargin: boolean;
    subtask: LocalProjectTask;
    variant: "add" | "delete";
    onClick: (e: MouseEvent) => void;
  } = $props();

  let showInfoScreen = $state(false);
</script>

<div
  class={`${hasMargin ? "mt-1" : ""} relative flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-700`}
>
  <InfoScreen {showInfoScreen} {subtask} {currentProject} />
  <Icon
    name={subtask.isChecked ? "issueclosed" : "issueopen"}
    variant="rounded"
    width={24}
    height={24}
    extraCSS={subtask.isChecked ? "stroke-purple-500" : "stroke-green-500"}
  />
  <Button
    meaning="discrete-neutral"
    onClick={(e) => {
      if (e.shiftKey) {
        currentTab = "appearance";
        switchToTask(subtask);
      }
    }}
    extraRules={["no-padding"]}
    extraCSS="hover:underline"
    onMouseEnter={() => (showInfoScreen = true)}
    onMouseLeave={() => (showInfoScreen = false)}
  >
    {#snippet text()}
      {subtask.title}
    {/snippet}
  </Button>
  <div class="ml-auto pl-1">
    {subtask.size === "small" ? "🟢" : subtask.size === "medium" ? "🟡" : "🔴"}
  </div>
  <div class="pr-1">
    {subtask.difficulty === "easy"
      ? "🧨"
      : subtask.difficulty === "medium"
        ? "💣"
        : "☢️"}
  </div>
  <Button
    meaning={variant === "add" ? "positive" : "negative"}
    {onClick}
    extraRules={["no-padding"]}
    extraCSS="p-1"
  >
    {#snippet icon()}
      <Icon name={variant} variant="rounded" width={24} height={24} />
    {/snippet}
  </Button>
</div>
