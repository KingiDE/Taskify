<!-- The foundational component for creating textarea-fields of any type (text and number). 
The getter function returns the acutal value while the setter function updates the state.
This component works similar to the Input-component.  -->

<script lang="ts">
	const {
		getter,
		setter,
		label,
		placeholder,
		labelExtraCSS,
		inputExtraCSS,
	}: {
		getter: () => string;
		setter: (newValue: string) => void;
		label: string;
		placeholder?: string;
		labelExtraCSS?: string;
		inputExtraCSS?: string;
	} = $props();
</script>

<label class={labelExtraCSS}>
	{label}
	<textarea
		class={`block mt-1 -outline-offset-1 outline-1 outline-gray-500 rounded-md p-2 resize-none w-full h-20 focus-visible:outline-white transition-[outline] ${inputExtraCSS}`}
		bind:value={getter, setter}
		{placeholder}
	></textarea>
</label>
