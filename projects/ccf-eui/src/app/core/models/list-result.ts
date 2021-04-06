import { TissueBlockResult } from 'ccf-database';

export interface ListResult {
  selected: boolean;
  color?: string;
  tissueBlock: TissueBlockResult;
  rank?: number;
}
