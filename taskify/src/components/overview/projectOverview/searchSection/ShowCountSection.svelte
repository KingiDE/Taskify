<script lang="ts">
// biome-ignore lint/style/useConst: These are props and work like this
let {
	shownCount,
	exsitingCount,
}: {
	shownCount: number;
	exsitingCount: number;
} = $props();
</script>

<div class="h-2">
  <!-- Avoid margin collapse -->
</div>
{#if shownCount !== exsitingCount}
  <div class="mt-2">
    <span class="opacity-50">Displaying</span>
    {shownCount} <span class="opacity-50">of</span>
    {exsitingCount} <span class="opacity-50">tasks</span>
  </div>
{/if}
