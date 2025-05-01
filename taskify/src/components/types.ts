import type { icons } from "./ui/icons";

export type LocalProject = {
  id: string;
  name: string;
  description: string;
  accentColor: LocalProjectColor;
  icon: keyof typeof icons;
  tasks: Array<LocalProjectTask>;
  enabledFields: Array<LocalProjectEnabledFields>;
  customFields: Array<LocalProjectCustomField>;
  searchQuery: string;
  sortedBy: string;
  sortDirection: "ascending" | "descending";
  groupedBy: string | null;
};

export type LocalProjectSortDirection = "ascending" | "descending";

export type LocalProjectEnabledFields = "size" | "difficulty";

export type LocalProjectCustomField = {
  id: string;
  name: string;
  isVisible: boolean;
} & (
  | { variant: "number" | "text" | "checkbox"; options: null }
  | { variant: "select"; options: Array<string> }
);

export type LocalProjectCustomFieldInput = {
  name: string;
  variant: "number" | "text" | "checkbox" | "select";
  options: Array<string>;
};

export type LocalProjectTask = {
  id: string;
  title: string;
  description: string;
  isChecked: boolean;
  size: "small" | "medium" | "large";
  difficulty: "easy" | "medium" | "hard";
  childTasks: Array<string>;
  customFields: Array<
    | TaskCheckboxVariantCustomField
    | TaskSelectVariantCustomField
    | TaskTextOrNumberVariantCustomField
  >;
};

export type TaskCheckboxVariantCustomField = {
  id: string;
  variant: "checkbox";
  value: boolean;
};

export type TaskTextOrNumberVariantCustomField = {
  id: string;
  variant: "number" | "text";
  value: string;
};

export type TaskSelectVariantCustomField = {
  id: string;
  variant: "select";
  value: string | null;
};

export type LocalProjectColor =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | null;

export type PossiblePopups =
  | "add_project"
  | "edit_project"
  | "add_task"
  | "edit_task"
  | "delete_task"
  | "settings"
  | null;

export type PossibleEditProjectPopupTabs =
  | "appearence"
  | "destruction"
  | "fields";

export type PossibleEditProjectFieldsSubpopups =
  | "add_field"
  | "edit_field"
  | "delete_field"
  | null;

export type PossibleEditTaskPopupTabs =
  | "appearence"
  | "destruction"
  | "fields"
  | "relation";

export type PossibleSearchSubpopups = "sort" | "group" | null;
