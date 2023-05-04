import { Store } from 'triple-store-utils';
/**
 * Function to add additional ccf_annotations to rui locations based on the
 * reference organ it was placed relative to.
 *
 * @param store the triple store holding the CCF.OWL data
 */
export declare function enrichRuiLocations(store: Store): void;
