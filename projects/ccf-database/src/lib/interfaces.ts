import { ObservableInput } from 'rxjs';

export interface AggregateResult {
  label: string;
  count: string | number;
}

export interface ListResult {
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

export interface Filter {
  sex: 'Both' | 'Male' | 'Female';
  ageRange: [number, number];
  bmiRange: [number, number];
  tmc: string[];
  technologies: string[];
  ontologyTerms: string[];
}

export interface DataSource {
  getListResults(filter?: Filter): ObservableInput<ListResult[]>;
  getAggregateResults(filter?: Filter): ObservableInput<AggregateResult[]>;
  getImageViewerData(id: string): ObservableInput<ImageViewerData>;
}
