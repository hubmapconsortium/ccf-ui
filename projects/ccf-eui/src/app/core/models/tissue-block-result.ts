interface ListResultItem {
  '@id': string;
  label: string;
  description: string;
  link: string;
}

interface DonorResult extends ListResultItem {
  '@type': 'Donor';
}

interface DatasetResult extends ListResultItem {
  '@type': 'Dataset';
  technology: string;
  thumbnail: string;
}

interface TissueSectionResult extends ListResultItem {
  '@type': 'Sample';
  sampleType: 'Tissue Section' | 'Non-Standard';
  sectionNumber: number;
  datasets: DatasetResult[];
}

export interface TissueBlockResult extends ListResultItem {
  '@type': 'Sample';
  sampleType: 'Tissue Block' | 'Non-Standard';
  sectionCount: number;
  sectionSize: number;
  sectionUnits: string;
  donor: DonorResult;
  ruiLocationId: string;
  sections: TissueSectionResult[];
  datasets: DatasetResult[];
}
