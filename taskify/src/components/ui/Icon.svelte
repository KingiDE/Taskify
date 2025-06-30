<!-- The component to create consistent icon all over the app. -->

<script lang="ts">
	import { icons } from "./icons";

	const {
		name,
		variant,
		extraCSS,
		width,
		height,
		id,
	}: {
		name: keyof typeof icons;
		variant: keyof (typeof icons)[typeof name];
		extraCSS?: string;
		width?: number;
		height?: number;
		id?: string;
	} = $props();
</script>

<svg class={extraCSS} {width} {height} viewBox="0 0 24 24" {id}>
	{@html icons[name][variant]}
</svg>
