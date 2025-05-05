// The function takes in a string slice and returns it.
// If the slice starts and ends with an double quote, these will get removed.
export function doubleDuoteFree(slice: string) {
	if (slice.startsWith('"') && slice.endsWith('"')) {
		return slice.slice(1, slice.length - 1);
	}

	return slice;
}

// The function mutates the first character in the string slice to its capital counterpart if possible
// and then returns the slice.
export function firstCapital(slice: string) {
	const firstChar = slice.charAt(0);
	const capitalized = firstChar.toUpperCase();

	return capitalized + slice.slice(1);
}
