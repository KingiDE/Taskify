<script lang="ts">
  import type { LocalProject } from "@components/types";
  import NavbarIcon from "../NavbarIcon.svelte";
  import ExportTab from "./tabs/exportTab/ExportTab.svelte";
  import HotkeysTab from "./tabs/hotkeysTab/HotkeysTab.svelte";
  import SearchTab from "./tabs/searchTab/SearchTab.svelte";

  const {
    projects,
  }: {
    projects: Array<LocalProject>;
  } = $props();

  // biome-ignore lint/style/useConst: <explanation>
  let currentTab = $state<"hotkeys" | "search" | "export">("hotkeys");
</script>

<div class="grid content-start gap-4 max-h-[700px] h-[calc(100dvh_-_48px)]">
  <h1 class="font-poppins font-bold text-2xl">Settings</h1>
  <div
    class="grid min-[800px]:grid-cols-[250px_auto] gap-8 content-start overflow-y-hidden"
  >
    <nav class="grid gap-2 content-start">
      <NavbarIcon
        buttonText="Hotkeys"
        iconName="edit"
        tabValue="hotkeys"
        bind:currentTab
      />
      <NavbarIcon
        buttonText="Search operators"
        iconName="search"
        tabValue="search"
        bind:currentTab
      />
      <NavbarIcon
        buttonText="Export data"
        iconName="download"
        tabValue="export"
        bind:currentTab
      />
    </nav>
    <div class={`w-full overflow-y-scroll`}>
      {#if currentTab === "hotkeys"}
        <HotkeysTab />
      {/if}
      {#if currentTab === "search"}
        <SearchTab />
      {/if}
      {#if currentTab === "export"}
        <ExportTab {projects} />
      {/if}
    </div>
  </div>
</div>
