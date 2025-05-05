<script lang="ts">
import HotkeyEntry from "./HotkeyEntry.svelte";
</script>

<div class="grid gap-4">
  <HotkeyEntry
    title="Create new project:"
    keyA="Shift"
    keyB="N"
    additionalNote="If there's a project selected, the sidebar must be expanded for this hotkey to work."
  />
  <HotkeyEntry
    title="Create new task:"
    keyA="Shift"
    keyB="N"
    additionalNote="There must be a project selected and the sidebar cannot be expanded for
      this hotkey to work."
  />
  <HotkeyEntry
    title="Toggle sidebar:"
    keyA="Shift"
    keyB="B"
    additionalNote="There must not be a popup open for this hotkey to work."
  />
  <HotkeyEntry title="Jump to nearest input:" keyA="Shift" keyB="F" />
  <HotkeyEntry
    title="Edit project:"
    keyA="Shift"
    keyB="E"
    additionalNote="There must be a project selected for this hotkey to work."
  />
</div>
