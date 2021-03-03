
/** A range which should have the specified classes and styles applied */
export interface DecoratedRange {
  /** Start index of range (inclusive). Negative indicies are allowed. */
  start: number;
  /** End index of range (exclusive). Negative indicies are allowed. */
  end: number;
  /** Classes to add */
  classes: string[];
  /** Styles to set */
  styles: Record<string, unknown>;
}

/**
 * Resolves and normalizes an index for indexing into an array of length `length`.
 *
 * @param index The index value to resolve. May be negative indicating an index from end.
 * @param length The length of the object on which this index will be used.
 * @returns A positive index in range [0, length]
 */
function resolveIndex(index: number, length: number): number {
  if (index >= 0 && index < length) {
    return index;
  } else if (index >= length) {
    return length;
  } else if (index + length < 0) {
    return 0;
  } else {
    return index + length;
  }
}

/**
 * Produces a new range object based on the input where all properties have been normalized.
 *
 * @param range The object to normalize.
 * @param length Max length for indices.
 * @returns A new object where all undefined values have been replaced with defaults and
 * where all indices have been constrained to the range [0, length].
 */
export function normalize(range: Partial<DecoratedRange>, length: number): DecoratedRange {
  const start = resolveIndex(range.start ?? 0, length);
  const end = resolveIndex(range.end ?? length, length);
  const classes = range.classes ?? [];
  const styles = range.styles ?? {};
  return { start, end, classes, styles };
}
