<!-- This component lets you open the add-task popup. -->

<script lang="ts">
import Button from "@ui/Button.svelte";
import Icon from "@ui/Icon.svelte";

// biome-ignore lint/style/useConst: These are props and work like this
let {
	wantToAddTask,
}: {
	wantToAddTask: () => void;
} = $props();
</script>

<Button
  meaning="positive"
  onClick={wantToAddTask}
  extraCSS="mt-4 py-2 px-4"
  extraRules={["no-padding"]}
>
  {#snippet icon()}
    <Icon name="add" width={24} height={24} variant="rounded" />
  {/snippet}
  {#snippet text()}
    Add task
  {/snippet}
</Button>
