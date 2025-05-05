<!-- The component that is used in popups that have multiple tabs to switch between them. -->

<script lang="ts">
import Button from "@ui/Button.svelte";
import Icon from "@ui/Icon.svelte";
import type { icons } from "@ui/icons";

let {
	buttonText,
	iconName,
	tabValue,
	currentTab = $bindable(),
}: {
	buttonText: string;
	iconName: keyof typeof icons;
	tabValue: string;
	currentTab: string;
} = $props();

function switchToThisTab() {
	currentTab = tabValue;
}
</script>

<Button
  meaning="neutral"
  onClick={switchToThisTab}
  extraRules={["no-padding", "no-bg"]}
  extraCSS={`px-2 py-1 ${tabValue === currentTab ? "bg-gray-500" : ""}`}
>
  {#snippet text()}
    {buttonText}
  {/snippet}
  {#snippet icon()}
    <Icon name={iconName} variant="rounded" width={24} height={24} />
  {/snippet}
</Button>
