<!-- This component lets you select the value of the any custom field of the variant "checkbox" directly in the table . -->

<script lang="ts">
import Checkbox from "@ui/Checkbox.svelte";

const {
	customField = $bindable(),
}: {
	customField: {
		id: string;
		variant: "checkbox";
		value: boolean;
	};
} = $props();
</script>

<td class="border-gray-500">
  <Checkbox
    onClick={() => {
      customField.value = !customField.value;
    }}
    value={customField.value}
    extraCSS="justify-center"
  />
</td>
