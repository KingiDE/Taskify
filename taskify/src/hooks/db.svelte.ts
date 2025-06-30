import type { LocalProject } from "../components/types";

// Open the IndexedDB database and return the database instance
const openDatabase = (): Promise<IDBDatabase | null> => {
	return new Promise<IDBDatabase | null>((resolve, reject) => {
		const request = indexedDB.open("taskify", 1);

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBRequest).result;
			if (!db.objectStoreNames.contains("projects")) {
				db.createObjectStore("projects", {
					keyPath: "id",
					autoIncrement: true,
				});
			}
		};

		request.onerror = () => {
			reject(null);
		};

		request.onsuccess = () => {
			resolve(request.result);
		};
	});
};

// Load all entries from the 'projects' table.
// If something failed, the function returns an empty array,
export const loadProjects = async (): Promise<Array<LocalProject>> => {
	try {
		const db = await openDatabase();
		if (db === null) return Promise.reject([]);

		return new Promise<Array<LocalProject>>((resolve, reject) => {
			const transaction = db.transaction("projects", "readonly");
			const store = transaction.objectStore("projects");
			const request = store.getAll();

			request.onerror = () => {
				reject([]);
			};

			request.onsuccess = () => {
				resolve(request.result);
			};
		});
	} catch (error) {
		return new Promise<Array<LocalProject>>((_resolve, reject) => {
			reject([]);
		});
	}
};

// Store a object or update it by passing the project itself.
// If the id doesn't exist already, the project is added, otherwise it will be updated.
// The function returns a promise containing a boolean that indicates if everything worked fine.
export const storeProject = async (project: LocalProject): Promise<boolean> => {
	try {
		const db = await openDatabase();
		if (db === null) return Promise.reject(false);

		return new Promise<boolean>((resolve, reject) => {
			const transaction = db.transaction("projects", "readwrite");
			const store = transaction.objectStore("projects");
			const request = store.put(project);

			request.onerror = () => {
				reject(false);
			};

			request.onsuccess = () => {
				resolve(true);
			};
		});
	} catch (_error) {
		return Promise.reject(false);
	}
};

// Delete a project with the given id from the IndexDB.
// The function returns whether the process went fine or failed.
export const deleteProject = async (id: string): Promise<boolean> => {
	try {
		const db = await openDatabase();
		if (db === null) return Promise.reject(false);

		return new Promise<boolean>((resolve, reject) => {
			const transaction = db.transaction("projects", "readwrite");
			const store = transaction.objectStore("projects");
			const request = store.delete(id);

			request.onerror = () => {
				reject(false);
			};

			request.onsuccess = () => {
				resolve(true);
			};
		});
	} catch (_error) {
		return Promise.reject(false);
	}
};
