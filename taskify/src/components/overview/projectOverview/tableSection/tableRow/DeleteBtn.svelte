<!-- This component lets you open the delete-task-popup directly in the table. -->

<script lang="ts">
  import Button from "@ui/Button.svelte";
  import Icon from "@ui/Icon.svelte";

  let {
    wantToDeleteTask,
  }: {
    wantToDeleteTask: () => void;
  } = $props();
</script>

<td class="border-gray-500 text-center">
  <Button
    meaning="negative"
    onClick={wantToDeleteTask}
    extraRules={["no-padding"]}
    extraCSS="p-1"
  >
    {#snippet icon()}
      <Icon height={24} width={24} name="delete" variant="rounded" />
    {/snippet}
  </Button>
</td>
