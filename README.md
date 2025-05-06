
![Taskify README Banner](https://github.com/user-attachments/assets/a64fa617-2207-4823-b882-d06757383a54)

Taskify is a privacy-focused project-planning tool that works entirely locally on your device. It provides basic functionality such as sorting and filtering all tasks as well as creating custom fields.   

## ⛏️ Usage

Taskify can be visited on https://taskify-vert-gamma.vercel.app. After opening the website for the first time, it will install a service worker that caches all required resources for offline-use. Furthermore, you're now able to "install" the website as a progressive-web-app and open it like you're used from normal apps.

To start using Taskify, simply create a new project by clicking the plus-icon on the left and filling out the form. You can choose from different icons, enter a name and a description. Obviously, this can be modified later. 

> Quick tip: Press `Shift` + `B` to toggle the expanded sidebar.

Each project contains multiple tasks, which by themselves consist of a name, description, subtasks, a size and difficulty and values for custom fields that were created in a project before.
Using the search-input above the table, you can sort and filter all tasks to your likings. 

## 🔒 Privacy

Because Taskify makes use of the integrated database that's baked into the browser itself, so no calls to external servers will ever be made. This means that all data will always be ONLY stored locally on your device and neither be published nor backuped on a server.

## ❌️ Delete all data

To delete all of your data, click the settings-button at the bottom-right corner of your screen and press the "Delete all data"-button. This will empty the entire local-database store.

## 💻 Run locally

**Run locally:** <br/>
To run this project yourself, simply clone the repository, install all the required npm-packages (e.g. with `bun install`) and start the dev-server (e.g. with `bun run dev`). 
After that, everything should work just perfectly fine.

**Extensions:** <br/>
It might be useful to install extensions for the tools that are used in this project. Here's a short list:
- Astro
- Svelte
- Biome (Linter and Code-Formatter)
- TailwindCSS Intellisense

Also, to correctly format on save, you can modify your Code editor's settings to use Biome as the default formatter for `.ts`, `.js` and `.svelte` files. 

**Scripts:** <br/>
There are two important scripts in the `package.json` file: `ts-check` checks for any TypeScript errors, `biome-check` lints the code, formats it (even without the extension installed) and points out possible errors. 
Additionally, you can run `npx sv check` (or your preferred package manager) to check for any Svelte errors.

## ❓️ Help

At the bottom left corner there's a cogwheel that opens a helpful popup once you click it. It explains how hotkeys and search-operators work. 
If you are at some point unsure how to proceed you can create an issue inside this repository stating as much information as you have acess to. If you want to, you can also request an improvement to the documentation.

Try to include...

... an exact set of instructions on how to reproduce your problem/bug.
... screenshots/screen captures in cases where the your problem might be hard to understand for others.
