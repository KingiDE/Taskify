<!-- This component lets you select the value of the any custom field of the variant "text" or "number" directly in the table . -->

<script lang="ts">
	import Input from "@ui/Input.svelte";

	const {
		customField = $bindable(),
	}: {
		customField: {
			id: string;
			variant: "text" | "number";
			value: string;
		};
	} = $props();
</script>

<td class="min-w-[125px] border-gray-500 relative text-center">
	<Input
		getter={() => customField.value}
		setter={(newValue) => (customField.value = newValue)}
		type={customField.variant}
	/>
</td>
