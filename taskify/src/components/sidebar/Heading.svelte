<!-- The heading in the sideabar that contains the burger-icon and "All projects" text. -->

<script lang="ts">
  import Button from "@ui/Button.svelte";
  import Icon from "@ui/Icon.svelte";
  const {
    isSidebarExpanded,
    toggleIsSidebarExpanded,
  }: {
    isSidebarExpanded: boolean;
    toggleIsSidebarExpanded: () => void;
  } = $props();
</script>

<div
  class={`h-8 flex overflow-hidden gap-4 items-start transition-[margin] ${isSidebarExpanded ? "" : "ml-1"}`}
>
  <Button
    onClick={toggleIsSidebarExpanded}
    meaning="discrete-neutral"
    extraCSS="flex-none"
    extraRules={["no-padding"]}
  >
    {#snippet icon()}
      <Icon name="hamburger" variant="rounded" width={32} height={32} />
    {/snippet}
  </Button>
  <h2
    class={`text-2xl font-poppins font-bold transition-opacity duration-[50ms] ${isSidebarExpanded ? "opacity-100 delay-100" : "opacity-0"}`}
  >
    All projects
  </h2>
</div>
