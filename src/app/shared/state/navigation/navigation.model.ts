import { TissueImage } from '../database/database.models';

/**
 * Navigation state model.
 */
export interface NavigationStateModel {
  tissues: TissueImage[];
  activeTissue: TissueImage;
  activeOrgan: { id: string }; // FIXME: Correct typing
}
