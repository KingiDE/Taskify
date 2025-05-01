<!-- This component wraps the logic of a button to select the accent color of a project. -->

<script lang="ts">
  import type { LocalProject, LocalProjectColor } from "@components/types";
  import Button from "@ui/Button.svelte";

  let {
    field,
    className,
    project = $bindable(),
  }: {
    field: LocalProjectColor;
    className: string;
    project: Omit<LocalProject, "id">;
  } = $props();

  function selectThisColor() {
    project.accentColor = field;
  }
</script>

<Button
  onClick={selectThisColor}
  meaning="neutral"
  extraRules={["no-bg"]}
  extraCSS={`${project.accentColor === field ? "bg-gray-500" : ""}`}
>
  {#snippet text()}
    <div class={`rounded-full w-5 h-5 ${className}`}></div>
  {/snippet}
</Button>
