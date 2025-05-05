<!-- This component wraps the components to edit all fields of a project. -->

<script lang="ts">
import Popup from "@components/Popup.svelte";
import type {
	LocalProject,
	LocalProjectCustomField,
	PossibleEditProjectFieldsSubpopups,
} from "@components/types";
import { resetAddCustomFieldInputs } from "@hooks/customFields/useAddCustomField.svelte";
import EnableDisableSection from "./EnableDefaultFieldsSection.svelte";
import ViewFieldsSection from "./ViewFieldsSection.svelte";
import DeleteCustomFieldSubpopup from "./subpopups/DeleteCustomFieldSubpopup.svelte";
import EditCustomFieldSubpopup from "./subpopups/EditCustomFieldSubpopup.svelte";
import AddCustomFieldSection from "./subpopups/addCustomFieldSubpopup/AddCustomFieldSubpopup.svelte";

// biome-ignore lint/style/useConst: These are props and work like this
let {
	project = $bindable(),
}: {
	project: LocalProject;
} = $props();

// biome-ignore lint/style/useConst: <explanation>
let subpopup = $state<PossibleEditProjectFieldsSubpopups>(null);

// biome-ignore lint/style/useConst: <explanation>
let currentCustomField = $state<LocalProjectCustomField | null>(null);
</script>

<Popup
  bind:popup={subpopup}
  onClose={() => {
    // Resets the addCustomFieldInput to default when ANY subpopup gets closed
    resetAddCustomFieldInputs();
  }}
  maxWidth="max-w-[450px]"
>
  {#snippet innerPopup()}
    {#if subpopup === "add_field"}
      <AddCustomFieldSection bind:project bind:subpopup />
    {/if}
    {#if subpopup === "delete_field" && currentCustomField !== null}
      <DeleteCustomFieldSubpopup
        bind:project
        bind:subpopup
        bind:currentCustomField
      />
    {/if}
    {#if subpopup === "edit_field" && currentCustomField !== null}
      <EditCustomFieldSubpopup bind:currentCustomField />
    {/if}
  {/snippet}
</Popup>
<div class="w-full">
  <EnableDisableSection bind:project />
  <ViewFieldsSection bind:project bind:subpopup bind:currentCustomField />
</div>
