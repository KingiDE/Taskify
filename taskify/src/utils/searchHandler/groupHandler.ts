import type { LocalProjectTask } from "@components/types";

export function groupTasksByProjectSettings(
  groupedBy: string | null,
  tasks: Array<LocalProjectTask>,
) {
  if (groupedBy === null) return { unset: tasks };

  const groupedTasks: Record<string | number, Array<LocalProjectTask>> = {};

  function addToFieldInGroupedTasks(
    field: string | number,
    task: LocalProjectTask,
  ) {
    if (groupedTasks[field] === undefined) {
      groupedTasks[field] = [task];
    } else {
      groupedTasks[field].push(task);
    }
  }

  tasks.map((task) => {
    if (groupedBy === "title") {
      addToFieldInGroupedTasks(task.title, task);
    } else if (groupedBy === "title") {
      addToFieldInGroupedTasks(task.title, task);
    } else if (groupedBy === "description") {
      addToFieldInGroupedTasks(task.description, task);
    } else if (groupedBy === "size") {
      addToFieldInGroupedTasks(task.size, task);
    } else if (groupedBy === "difficulty") {
      addToFieldInGroupedTasks(task.difficulty, task);
    } else if (groupedBy === "done") {
      addToFieldInGroupedTasks(String(task.isChecked), task);
    } else if (groupedBy === "relations") {
      addToFieldInGroupedTasks(task.childTasks.length, task);
    } else {
      const possibleCustomFieldForRecord = task.customFields.find(
        (el) => el.id === groupedBy,
      );

      if (possibleCustomFieldForRecord) {
        addToFieldInGroupedTasks(
          String(possibleCustomFieldForRecord.value),
          task,
        );
      }
    }
  });

  return groupedTasks;
}
