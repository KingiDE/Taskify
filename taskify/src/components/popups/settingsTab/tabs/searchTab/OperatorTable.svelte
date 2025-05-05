<script lang="ts">
const {
	operator,
	description,
	useBlocks,
	noPaddingBottom,
}: {
	operator: string;
	description: string;
	useBlocks: Array<string>;
	noPaddingBottom?: boolean;
} = $props();
</script>

<tr>
  <td
    class={`px-2 ${
      noPaddingBottom ? "" : "pb-8"
    } w-[88px] opacity-50 text-center align-top`}>{operator}</td
  >
  <td class={`px-2 ${noPaddingBottom ? "" : "pb-8"} w-[220px] align-top`}
    >{description}</td
  >
  <td class={`px-2 ${noPaddingBottom ? "" : "pb-8"} grid gap-2`}>
    {#each useBlocks as useBlock}
      <div
        class="py-1 px-3 text-sm rounded-md -outline-offset-1 bg-gray-700 outline-1 outline-gray-500 text-center"
      >
        {useBlock}
      </div>
    {/each}
  </td>
</tr>
