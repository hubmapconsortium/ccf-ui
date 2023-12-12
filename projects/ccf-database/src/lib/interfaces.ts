/* eslint-disable @typescript-eslint/naming-convention */
/** Status of the database */
export interface DatabaseStatus {
  /** Status of the database */
  status: 'Ready' | 'Loading' | 'Error';
  /** How long to wait (in milliseconds) before checking status again */
  checkback?: number;
  /** The amount of time (in milliseconds) taken to load the database */
  loadTime?: number;
  /** Human readable description of the current status */
  message?: string;
  /** Timestamp of last update */
  timestamp?: string;
}

/** Aggregate query result */
export interface AggregateResult {
  /** Queried field */
  label: string;
  /** Aggregate value */
  count: string | number;
}

/** List result */
export interface ListResultItem {
  /** Identifier */
  '@id': string;
  /** Label */
  label: string;
  /** Description */
  description: string;
  /** Associated URL */
  link: string;
}

/** Donor List Result */
export interface DonorResult extends ListResultItem {
  /** JSON-LD Type */
  '@type': 'Donor';
  /** Provider Name */
  providerName: string;
}

/** Dataset List Result */
export interface DatasetResult extends ListResultItem {
  /** JSON-LD Type */
  '@type': 'Dataset';
  /** Technology used in data */
  technology: string;
  /** Representative thumbnail URL */
  thumbnail: string;
}

/** Tissue Section List Result */
export interface TissueSectionResult extends ListResultItem {
  /** JSON-LD Type */
  '@type': 'Sample';
  /** Sample tissue section type */
  sampleType: 'Tissue Section' | 'Non-Standard';
  /** Index into the sequence of sections from the parent block */
  sectionNumber: number;
  /** Datasets derived from this tissue section */
  datasets: DatasetResult[];
}

/** Tissue Block List Result */
export interface TissueBlockResult extends ListResultItem {
  /** JSON-LD Type */
  '@type': 'Sample';
  /** Sample tissue block type */
  sampleType: 'Tissue Block' | 'Non-Standard';
  /** Number of sections extracted from this block */
  sectionCount: number;
  /** Size of each tissue section */
  sectionSize: number;
  /** Units of the section size (generally, millimeters) */
  sectionUnits: string;

  /** The donor this tissue block was derived from */
  donor: DonorResult;
  /** The associated spatial entity (rui_location) for this block */
  spatialEntityId: string;
  /** The sections extracted from this tissue block */
  sections: TissueSectionResult[];
  /** Datasets derived from this tissue block */
  datasets: DatasetResult[];
}

/** Item that can be searched for */
export interface SearchableItem {
  /** Identifier */
  id: string;
  /** Sex */
  sex?: 'Male' | 'Female';
  /** Age */
  age?: number;
  /** BMI */
  bmi?: number;
  /** Ontology terms */
  ontologyTerms?: Set<string>;
  /** CellType terms */
  cellTypeTerms?: Set<string>;
  /** Biomarker terms */
  biomarkerTerms?: Set<string>;
}

/** Specification for a Spatial Search via Probing Sphere */
export interface SpatialSearch {
  /** X coordinate relative to target in millimeters */
  x: number;
  /** y coordinate relative to target in millimeters */
  y: number;
  /** z coordinate relative to target in millimeters */
  z: number;
  /** Size of the probing sphere in millimeters */
  radius: number;
  /** The target spatial entity IRI */
  target: string;
}

/** Options applied during queries */
export interface Filter {
  /** Sex */
  sex: 'Both' | 'Male' | 'Female';
  /** Age range */
  ageRange: [number, number];
  /** BMI range */
  bmiRange: [number, number];
  /** Consortiums */
  consortiums: string[];
  /** Tissue Providers */
  tmc: string[];
  /** Technologies */
  technologies: string[];
  /** Ontology terms */
  ontologyTerms: string[];
  /** CellType terms */
  cellTypeTerms: string[];
  /** Biomarker terms */
  biomarkerTerms: string[];
  /** spatial search */
  spatialSearches: SpatialSearch[];
  /** Include optional debugging information */
  debug?: boolean;
}

/** A node in the ontology */
export interface OntologyTreeNode {
  /** Identifier / IRI */
  '@id': string;
  /** JSON-LD Type */
  '@type': 'OntologyTreeNode';
  /** Identifier / IRI */
  id: string;
  /** RDFS label */
  label: string;
  /** Parent ontology node */
  parent: string;
  /** Child ontology nodes */
  children: string[];
  /** Synonym labels */
  synonymLabels: string[];
}

/** Ontology tree model */
export interface OntologyTreeModel {
  /** id of the root node of the ontology */
  root: string;
  /** Mapping from id/IRI to ontology node instance */
  nodes: { [id: string]: OntologyTreeNode };
}
