export interface SearchStateModel {
  gender: 'male'| 'female' | undefined;
  ageRange: [number | undefined, number | undefined];
  tmc: string[];
  technologies: string[];
}
