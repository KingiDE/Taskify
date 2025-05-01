import type { LocalProjectColor } from "../../components/types";

// Maps the accent-color that is stored in a project to the correct Tailwind-Class.
// It also chooses the correct colored background according to whether the project is selected
export function mapAccentColorClass(
  accentColor: LocalProjectColor,
  currentProjectId: string | undefined,
  id: string,
) {
  switch (accentColor) {
    case "red":
      return `outline-1 outline-red-500 hover:bg-red-500/50 ${
        currentProjectId === id ? "bg-red-500/50" : "bg-red-500/20"
      }`;
    case "orange":
      return `outline-1 outline-orange-500 hover:bg-orange-500/50 ${
        currentProjectId === id ? "bg-orange-500/50" : "bg-orange-500/20"
      }`;
    case "amber":
      return `outline-1 outline-amber-500 hover:bg-amber-500/50 ${
        currentProjectId === id ? "bg-amber-500/50" : "bg-amber-500/20"
      }`;
    case "yellow":
      return `outline-1 outline-yellow-500 hover:bg-yellow-500/50 ${
        currentProjectId === id ? "bg-yellow-500/50" : "bg-yellow-500/20"
      }`;
    case "lime":
      return `outline-1 outline-lime-500 hover:bg-lime-500/50 ${
        currentProjectId === id ? "bg-lime-500/50" : "bg-lime-500/20"
      }`;
    case "green":
      return `outline-1 outline-green-500 hover:bg-green-500/50 ${
        currentProjectId === id ? "bg-green-500/50" : "bg-green-500/20"
      }`;
    case "emerald":
      return `outline-1 outline-emerald-500 hover:bg-emerald-500/50 ${
        currentProjectId === id ? "bg-emerald-500/50" : "bg-emerald-500/20"
      }`;
    case "teal":
      return `outline-1 outline-teal-500 hover:bg-teal-500/50 ${
        currentProjectId === id ? "bg-teal-500/50" : "bg-teal-500/20"
      }`;
    case "cyan":
      return `outline-1 outline-cyan-500 hover:bg-cyan-500/50 ${
        currentProjectId === id ? "bg-cyan-500/50" : "bg-cyan-500/20"
      }`;
    case "sky":
      return `outline-1 outline-sky-500 hover:bg-sky-500/50 ${
        currentProjectId === id ? "bg-sky-500/50" : "bg-sky-500/20"
      }`;
    case "blue":
      return `outline-1 outline-blue-500 hover:bg-blue-500/50 ${
        currentProjectId === id ? "bg-blue-500/50" : "bg-blue-500/20"
      }`;
    case "indigo":
      return `outline-1 outline-indigo-500 hover:bg-indigo-500/50 ${
        currentProjectId === id ? "bg-indigo-500/50" : "bg-indigo-500/20"
      }`;
    case "violet":
      return `outline-1 outline-violet-500 hover:bg-violet-500/50 ${
        currentProjectId === id ? "bg-violet-500/50" : "bg-violet-500/20"
      }`;
    case "purple":
      return `outline-1 outline-purple-500 hover:bg-purple-500/50 ${
        currentProjectId === id ? "bg-purple-500/50" : "bg-purple-500/20"
      }`;
    case "fuchsia":
      return `outline-1 outline-fuchsia-500 hover:bg-fuchsia-500/50 ${
        currentProjectId === id ? "bg-fuchsia-500/50" : "bg-fuchsia-500/20"
      }`;
    case "pink":
      return `outline-1 outline-pink-500 hover:bg-pink-500/50 ${
        currentProjectId === id ? "bg-pink-500/50" : "bg-pink-500/20"
      }`;
    case "rose":
      return `outline-1 outline-rose-500 hover:bg-rose-500/50 ${
        currentProjectId === id ? "bg-rose-500/50" : "bg-rose-500/20"
      }`;
    case null:
      return "";
  }
}
