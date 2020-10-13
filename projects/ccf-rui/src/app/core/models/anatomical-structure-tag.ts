/** Type for tag identifiers */
export type TagId = string | number;

/**
 * A tag
 */
export interface Tag {
  /** Unique identifier */
  id: TagId;
  /** Display label */
  label: string;
  /** How the tag was added */
  type: 'assigned' | 'added' | 'removed';
}

/**
 * Search result
 */
export interface TagSearchResult {
  /** Total number of possible results */
  totalCount: number;
  /** Partial results up to a limit */
  results: Tag[];
}
