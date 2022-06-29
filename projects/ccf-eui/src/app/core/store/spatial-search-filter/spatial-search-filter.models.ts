import { OrganInfo } from 'ccf-shared';

import { Sex } from '../../../shared/components/spatial-search-config/spatial-search-config.component';


export interface XYZTriplet {
  x: number;
  y: number;
  z: number;
}

export interface SpatialSearch {
  sex: Sex;
  organ: OrganInfo;
  radius: number;
  position: XYZTriplet;
}

export interface SelectableSpatialSearch {
  search: SpatialSearch;

  selected: boolean;
  description: string;
}
