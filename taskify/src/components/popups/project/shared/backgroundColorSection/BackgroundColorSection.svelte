<!-- This component lets you select the accent color of a project. -->

<script lang="ts">
import type { LocalProject } from "@components/types";
import AccentColorButton from "./AccentColorButton.svelte";

// biome-ignore lint/style/useConst: These are props and work like this
let {
	project = $bindable(),
}: {
	project: Omit<LocalProject, "id">;
} = $props();

const colorAndClassPairs = [
	[null, "bg-transparent"],
	["red", "bg-red-500"],
	["orange", "bg-orange-500"],
	["amber", "bg-amber-500"],
	["yellow", "bg-yellow-500"],
	["lime", "bg-lime-500"],
	["green", "bg-green-500"],
	["emerald", "bg-emerald-500"],
	["teal", "bg-teal-500"],
	["cyan", "bg-cyan-500"],
	["sky", "bg-sky-500"],
	["blue", "bg-blue-500"],
	["indigo", "bg-indigo-500"],
	["violet", "bg-violet-500"],
	["purple", "bg-purple-500"],
	["fuchsia", "bg-fuchsia-500"],
	["pink", "bg-pink-500"],
	["rose", "bg-rose-500"],
] as const;
</script>

<div class="mt-2">
  Accent color:
  <div class="mt-1 flex gap-2 flex-wrap">
    {#each colorAndClassPairs as item}
      <AccentColorButton bind:project field={item[0]} className={item[1]} />
    {/each}
  </div>
</div>
