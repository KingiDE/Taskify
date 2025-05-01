<!-- This subpopup is shown when you want to delete a existing relation. -->

<script lang="ts">
  import Popup from "../../../../Popup.svelte";
  import type { LocalProjectTask } from "@components/types";
  import Button from "@ui/Button.svelte";
  import Icon from "@ui/Icon.svelte";

  let {
    task = $bindable(),
    showDeletePopup = $bindable(),
  }: {
    task: Omit<LocalProjectTask, "id">;
    showDeletePopup: string | null;
  } = $props();
</script>

<Popup bind:popup={showDeletePopup} maxWidth="max-w-[450px]">
  {#snippet innerPopup()}
    <div class="grid bg-gray-800">
      <h1 class="font-poppins font-bold text-2xl">Delete this relation</h1>
      <div class="mt-4"></div>
      <div class="p-2 rounded-md bg-orange-500/50 outline-1 outline-orange-500">
        <div class="font-bold">Warning:</div>
        This is a destructive action! Unexpected things will happen if you don't
        read this carefully. This process is not reversible!
      </div>
      <div class="mt-4"><strong>Really</strong> delete this relation:</div>
      <div class="mt-1 flex gap-2">
        <Button
          extraCSS="py-2 px-4"
          extraRules={["no-padding"]}
          meaning="negative"
          onClick={() => {
            task.childTasks = task.childTasks.filter(
              (id) => id !== showDeletePopup
            );
            showDeletePopup = null;
          }}
        >
          {#snippet icon()}
            <Icon height={24} width={24} name="delete" variant="rounded" />
          {/snippet}
          {#snippet text()}
            Delete relation
          {/snippet}
        </Button>
      </div>
    </div>
  {/snippet}
</Popup>
