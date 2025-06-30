<!-- This component wraps the logic of a button to select the icon of a project. -->

<script lang="ts">
  import type { LocalProject } from "@components/types";
  import Button from "@ui/Button.svelte";
  import Icon from "@ui/Icon.svelte";
  import type { icons } from "@ui/icons";

  const {
    field,
    project = $bindable(),
  }: {
    field: keyof typeof icons;
    project: Omit<LocalProject, "id">;
  } = $props();

  function selectThisIcon() {
    project.icon = field;
  }
</script>

<Button
  onClick={selectThisIcon}
  meaning="neutral"
  extraRules={["no-bg"]}
  extraCSS={`${project.icon === field ? "bg-gray-500" : ""}`}
>
  {#snippet icon()}
    <Icon name={field} variant="rounded" width={24} height={24} />
  {/snippet}
</Button>
