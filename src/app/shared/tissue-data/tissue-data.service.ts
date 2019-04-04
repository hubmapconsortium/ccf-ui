import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { RouterState } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';

/**
 * Injectable data service for individual tissue view's data
 */
@Injectable()
export class TissueDataService {
  /**
   * Selector observable for instance of RouterStateSnapshot
   */
  @Select(RouterState.state)
  private routeState: Observable<RouterStateSnapshot>;
  /**
   * Path to images of tissues - TODO - this will come from a json file eventually
   */
  private readonly pathToImages = 'assets/tissues/';
  /**
   * Image file names - TODO - these will come from a json file eventually
   */
  private readonly imageSources = [
    'patient-64354_neg_IHC_3ch_registeredToIMS_RGB_unenhanced.dzi',
    'patient-64354_pos_PAS_RGB_registeredToIMS.dzi',
    'patient-64354_neg_IHC_3ch_registeredToIMS_RGB.dzi',
    'patient-64354_neg_IHC_3ch_registeredToIMS_RGB_unenhanced.dzi',
    'patient20_neg_TexasRed_IHC_registeredToIMS.dzi',
    'patient20_neg_GFP_IHC_registeredToIMS.dzi',
    'patient20_neg_DAPI_IHC_registeredToIMS.dzi',
    'patient20_neg_TRITC_AF_registeredToIMS.dzi',
    'patient20_neg_FITC_AF_registeredToIMS.dzi',
    'patient20_neg_DAPI_AF_registeredToIMS.dzi',
    'patient20_pos_preAF_registeredToIMS_r.dzi',
    'patient20_pos_preAF_registeredToIMS_g.dzi',
    'patient20_pos_preAF_registeredToIMS_b.dzi'
  ];

  /**
   * Observable for tissue source path constructed in this service
   */
  tissueSourcePath: Observable<string>;

  /**
   * Creates an instance of tissue data service.
   */
  constructor() {
    this.tissueSourcePath = this.routeState.pipe(rxMap(state => {
      return state && this.pathToImages + this.imageSources[+state.root.firstChild.params.tissueId - 1];
    }));
  }
}
