export interface Donor {
  link: string;
  label: string;
  description: string;
}

export interface DonorSampleDataset {
  thumbnail: string;
  link: string;
  label: string;
}

export interface DonorSamples {
  link: string;
  label: string;
  description: string;
  datasets: DonorSampleDataset[];
}

export interface DonorSample {
  link: string;
  label: string;
  description: string;
  datasets: DonorSampleDataset[];
  samples: DonorSamples[];
}

export interface DonorCard {
  selected: boolean;
  color: string;
  donor: Donor;
  rui_location: unknown;
  sample: DonorSample;
}
