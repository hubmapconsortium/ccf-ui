import { Selector } from '@ngxs/store';
import { OrganInfo } from 'ccf-shared';

import { Sex } from '../../../shared/components/spatial-search-config/spatial-search-config.component';
import { SceneState } from '../scene/scene.state';
import { SpatialSearchUiModel, SpatialSearchUiState } from './spatial-search-ui.state';


export class SpatialSearchUiSelectors {
  @Selector([SpatialSearchUiState])
  static sex(state: SpatialSearchUiModel): Sex {
    return state.sex;
  }

  @Selector([SpatialSearchUiState])
  static organId(state: SpatialSearchUiModel): string | undefined {
    return state.organId;
  }

  @Selector([SpatialSearchUiSelectors.organId, SceneState.referenceOrgans])
  static organ(id: string | undefined, organs: OrganInfo[]): OrganInfo | undefined {
    if (id === undefined) {
      return undefined;
    }

    return organs.find(organ => organ.id === id);
  }

  @Selector([SpatialSearchUiSelectors.sex, SceneState.referenceOrgans])
  static organs(sex: Sex, organs: OrganInfo[]): OrganInfo[] {
    return organs.filter(organ => this.organMatchesSex(organ, sex));
  }

  static organMatchesSex(organ: OrganInfo, sex: Sex): boolean {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return organ.hasSex || organ.sex === sex;
  }
}
