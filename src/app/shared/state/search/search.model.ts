export interface SearchStateModel {
  gender: 'male'| 'female' | 'male-female';
  ageRange: [number | undefined, number | undefined];
  tmc: string[];
  technologies: string[];
}
