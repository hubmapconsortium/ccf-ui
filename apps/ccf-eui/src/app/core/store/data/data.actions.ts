import { Filter } from 'ccf-database';

export class UpdateFilter {
  static readonly type = '[DataState] Update filter';

  constructor(readonly filter: Partial<Filter>) { }
}
