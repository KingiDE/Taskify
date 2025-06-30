<script lang="ts">
  let {
    widthOfSingleElement,
    indexOfSelectedElement,
    elements,
    extraCSS,
  }: {
    widthOfSingleElement: number;
    indexOfSelectedElement: number;
    elements: () => any;
    extraCSS?: string;
  } = $props();
</script>

<div
  class={`flex relative isolate -outline-offset-1 outline-1 outline-gray-500 rounded-md ${extraCSS}`}
>
  <div
    class="-z-10 absolute h-full bg-gray-500 rounded-md transition-[left]"
    style={`width: ${widthOfSingleElement}px; left: ${widthOfSingleElement * indexOfSelectedElement}px;`}
  ></div>
  {@render elements()}
</div>
