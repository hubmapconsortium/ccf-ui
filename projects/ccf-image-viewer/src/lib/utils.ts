
// Copied from vitessce-image-viewer views/utils.js
export function getVivId(id: string): string {
  return `-#${id}#`;
}

export function flatMap<T, U>(
  iterable: Iterable<T>,
  callback: (value: T, index: number) => Iterable<U>
): U[] {
  let index = 0;
  const results: U[] = [];

  for (const value of iterable) {
    for (const result of callback(value, index++)) {
      results.push(result);
    }
  }

  return results;
}
