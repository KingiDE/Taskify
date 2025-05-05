<!-- The button that is displayed in the sidebar to add new projects when clicked. -->

<script lang="ts">
import type { PossiblePopups } from "@components/types";
import Button from "@ui/Button.svelte";
import Icon from "@ui/Icon.svelte";

let {
	isSidebarExpanded = $bindable(),
	popup = $bindable(),
}: {
	isSidebarExpanded: boolean;
	popup: PossiblePopups;
} = $props();

function showAddProjectPopup() {
	popup = "add_project";
}
</script>

<Button meaning="neutral" onClick={showAddProjectPopup} extraCSS="mt-8 h-10">
  {#snippet icon()}
    <Icon
      extraCSS="flex-none"
      name="add"
      variant="rounded"
      width={24}
      height={24}
    />
  {/snippet}
  {#snippet text()}
    <div
      class={`transition-[opacity] ${isSidebarExpanded ? "opacity-100 delay-100" : "opacity-0"}`}
    >
      Add project
    </div>
  {/snippet}
</Button>
