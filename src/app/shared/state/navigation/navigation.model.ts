import { TissueImage } from '../database/database.models';

/**
 * Navigation state model.
 */
export interface NavigationStateModel {
  /**
   * Tissues to display in the browser view.
   */
  tissues: TissueImage[];

  /**
   * The currently active tissue displayed in the cell view.
   */
  activeTissue: TissueImage;

  /**
   * The organ displayed in the organ view.
   */
  activeOrgan: { id: string }; // FIXME: Correct typing
}
