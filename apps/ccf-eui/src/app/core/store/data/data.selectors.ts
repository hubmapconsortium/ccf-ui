import { Selector } from '@ngxs/store';
import { Filter, OntologyTreeModel } from 'ccf-database';
import { DataState, DataStateModel } from './data.state';

export class DataStateSelectors {
  @Selector([DataState])
  static filter(state: DataStateModel): Filter {
    return state.filter;
  }

  @Selector([DataState])
  static anatomicalStructuresTreeModel(state: DataStateModel): OntologyTreeModel {
    return state.anatomicalStructuresTreeModel ?? { root: '', nodes: {} };
  }

  @Selector([DataState])
  static cellTypesTreeModel(state: DataStateModel): OntologyTreeModel {
    return state.cellTypesTreeModel ?? { root: '', nodes: {} };
  }

  @Selector([DataState])
  static biomarkersTreeModel(state: DataStateModel): OntologyTreeModel {
    return state.biomarkersTreeModel ?? { root: '', nodes: {} };
  }
}
