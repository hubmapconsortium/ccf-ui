import { VisibilityItem } from './visibility-item';

/**
 * Contains information for an extraction set
 */
export interface ExtractionSet {
  /** Name of the set */
  name: string;

  /** Organ that the extraction sites belong to */
  organ?: string;

  /** Extraction sites belonging to the organ in the extraction set */
  sites: VisibilityItem[];
}
