<script lang="ts">
  const {
    title,
    keyA,
    keyB,
    additionalNote,
  }: {
    title: string;
    keyA: string;
    keyB?: string;
    additionalNote?: string;
  } = $props();
</script>

<div class="grid gap-2">
  <div class="flex gap-2 items-center">
    <div class="font-medium">{title}</div>
    <div
      class="py-1 px-3 text-sm rounded-md bg-gray-700 -outline-offset-1 outline-1 outline-gray-500"
    >
      {keyA}
    </div>
    {#if keyB}
      +
      <div
        class="py-1 px-3 text-sm rounded-md bg-gray-700 -outline-offset-1 outline-1 outline-gray-500"
      >
        {keyB}
      </div>
    {/if}
  </div>
  {#if additionalNote}
    <div class="relative px-3">
      <div class="opacity-50">
        {additionalNote}
      </div>
      <div
        class="absolute h-full w-1 bg-purple-600 top-0 left-0 rounded-md"
      ></div>
    </div>
  {/if}
</div>
