/** Aggregate query result. */
export interface AggregateResult {
  /** Queried field. */
  label: string;
  /** Aggregate value. */
  count: string | number;
}

export interface ListResult {
  '@id': string;
  '@type': 'ListResult';
  id: string;
  label: string;
  shortInfo?: string[];
  thumbnailUrl?: string;
  downloadUrl?: string;
  downloadTooltip?: string;
  resultUrl?: string;
  resultType?: 'external_link' | 'local_link' | 'image_viewer';
}

export interface ImageViewerData {
  id: string;
  metadata: { [label: string]: string };
}

export interface SearchableItem {
  id: string;
  sex?: 'Male' | 'Female';
  age?: number;
  bmi?: number;
  ontologyTerms?: Set<string>;
}

/** Options applied during queries. */
export interface Filter {
  sex: 'Both' | 'Male' | 'Female';
  ageRange: [number, number];
  bmiRange: [number, number];
  tmc: string[];
  technologies: string[];
  ontologyTerms: string[];
}

/** Backend query interface. */
export interface DataSource {
  /** Query list items. */
  getListResults(filter?: Filter): Promise<ListResult[]>;
  /** Query aggregate items. */
  getAggregateResults(filter?: Filter): Promise<AggregateResult[]>;
  /** Query a specific image. */
  getImageViewerData(id: string): Promise<ImageViewerData>;
}
