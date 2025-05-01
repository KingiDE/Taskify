// Takes in the entire search query and returns an array of single search queries.
// This function cares about quotes and hence will not just split by spaces.
export function splitIntoSingleFilters(searchQuery: string) {
  // Create safe zones between two double-quotes. In these zones, splitting by spaces won't happen.
  const listOfQuoteIndexes: Array<number> = [];

  searchQuery.split("").map((char, index) => {
    if (char === '"') listOfQuoteIndexes.push(index);
  });

  const listOfSafeZones: Array<{ from: number; to: number }> = [];

  for (let i = 0; i < listOfQuoteIndexes.length - 1; i += 2) {
    if (
      listOfQuoteIndexes[i] !== undefined &&
      listOfQuoteIndexes[1] !== undefined
    ) {
      listOfSafeZones.push({
        from: listOfQuoteIndexes[i],
        to: listOfQuoteIndexes[i + 1],
      });
    }
  }

  // Split the entire by spaces if their indexes isn't inside safe zones
  return splitStringByCondition(searchQuery, listOfSafeZones);
}

function splitStringByCondition(
  searchQuery: string,
  listOfSafeZones: Array<{ from: number; to: number }>,
) {
  let result = [];
  let startIndex = 0;

  for (let i = 0; i < searchQuery.length; i++) {
    let isSpaceInsideSafeZone = false;

    listOfSafeZones.map((safeZone) => {
      if (i > safeZone.from && i < safeZone.to) isSpaceInsideSafeZone = true;
    });

    if (isSpaceInsideSafeZone) {
      continue;
    }

    if (searchQuery[i] === " ") {
      result.push(searchQuery.slice(startIndex, i));
      startIndex = i + 1; // Start from the next character after the space
    }
  }

  // Push the last part of the string after the last space
  result.push(searchQuery.slice(startIndex));

  return result;
}
