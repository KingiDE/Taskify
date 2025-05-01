<script lang="ts">
  import type { LocalProject } from "@components/types";
  import Button from "@ui/Button.svelte";
  import Icon from "@ui/Icon.svelte";

  let {
    projects,
  }: {
    projects: Array<LocalProject>;
  } = $props();
</script>

<div>
  This feature allows you to download all of your data in a .json-file to be
  able to backup your projects or to move to any other provider of your choice.
</div>
<div class="my-2">
  To download this file, simply click the button "Download data" below.
</div>
<Button
  meaning="positive"
  onClick={() => {
    const blob = new Blob([JSON.stringify(projects)], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.txt";
    link.click();

    URL.revokeObjectURL(link.href);
  }}
>
  {#snippet icon()}
    <Icon width={24} height={24} name="download" variant="rounded" />
  {/snippet}
  {#snippet text()}
    Download data
  {/snippet}
</Button>
<div class="mt-4">
  <div class="font-medium">Why?</div>
  Taskify is not about locking you in, it's about the freedom to use what you want
  - following the philosophy of many FOSS.
</div>
