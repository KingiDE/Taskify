<!-- The component that is shown when you want to delete an existing task. -->

<script lang="ts">
import type { PossiblePopups } from "@components/types";
import DestructiveTab from "./shared/DestructiveTab.svelte";

// biome-ignore lint/style/useConst: These are props and work like this
let {
	deleteTaskWithCurrentId,
	popup = $bindable(),
}: {
	deleteTaskWithCurrentId: () => void;
	popup: PossiblePopups;
} = $props();
</script>

<div class="max-w-[575px] grid">
  <h1 class="font-poppins font-bold text-2xl">Delete this task</h1>
  <div class="mt-4"></div>
  <DestructiveTab {deleteTaskWithCurrentId} bind:popup />
</div>
