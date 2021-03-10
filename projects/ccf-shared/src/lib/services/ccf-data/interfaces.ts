/** Aggregate query result. */
export interface AggregateResult {
  /** Queried field. */
  label: string;
  /** Aggregate value. */
  count: string | number;
}

/** Result for list of tissues. */
export interface ListResult {
  /** Identifier. */
  '@id': string;
  /** Type string. */
  '@type': 'ListResult';
  /** Identifier. */
  id: string;
  /** Tissue label. */
  label: string;
  /** Short description. */
  shortInfo?: string[];
  /** Small icon url. */
  thumbnailUrl?: string;
  /** Url for data download. */
  downloadUrl?: string;
  /** Description of data download. */
  downloadTooltip?: string;
  /** Result url. */
  resultUrl?: string;
  /** Type of result url. */
  resultType?: 'external_link' | 'local_link';
  /** If the result should be highlighted */
  highlighted?: boolean;
}

/** Item that can be searched for. */
export interface SearchableItem {
  /** Identifier. */
  id: string;
  /** Sex. */
  sex?: 'Male' | 'Female';
  /** Age. */
  age?: number;
  /** BMI. */
  bmi?: number;
  /** Ontology terms. */
  ontologyTerms?: Set<string>;
}

/** Options applied during queries. */
export interface Filter {
  /** Sex. */
  sex: 'Both' | 'Male' | 'Female';
  /** Age range. */
  ageRange: [number, number];
  /** BMI range. */
  bmiRange: [number, number];
  /** TMC. */
  tmc: string[];
  /** Technologies. */
  technologies: string[];
  /** Ontology terms. */
  ontologyTerms: string[];
  /** Entities to be highlighted */
  highlightedEntities?: string[];
  /** Whether it has a spatial entity. */
  hasSpatialEntity?: boolean;
  /** Include optional debugging information */
  debug?: boolean;
}

/** Backend query interface. */
export interface DataSource {
  /** Query list items. */
  getListResults(filter?: Filter): Promise<ListResult[]>;
  /** Query aggregate items. */
  getAggregateResults(filter?: Filter): Promise<AggregateResult[]>;
}
