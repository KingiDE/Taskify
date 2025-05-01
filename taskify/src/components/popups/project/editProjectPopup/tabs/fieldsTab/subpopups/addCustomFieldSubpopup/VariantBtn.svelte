<!-- This component wraps the logic for creating a Variant-Button (Number, Text, Checkbox, Select) to be used inside the Create-CustomField subpopup. -->

<script lang="ts">
  import Button from "@ui/Button.svelte";

  let {
    inputVariant = $bindable(),
    text,
    variant,
  }: {
    inputVariant: "number" | "text" | "checkbox" | "select";
    text: string;
    variant: "number" | "text" | "checkbox" | "select";
  } = $props();
</script>

<Button
  meaning="discrete-neutral"
  onClick={() => (inputVariant = variant)}
  extraRules={["no-padding"]}
  extraCSS="px-2 py-1 flex-none w-[96px]"
>
  {#snippet text()}
    {text}
  {/snippet}
</Button>
