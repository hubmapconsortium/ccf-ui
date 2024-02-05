/**
 * Interface for visibility item data
 */
export interface VisibilityItem {
  /**
   * Id of the item
   */
  id: string | number;

  /**
   * Name of the item
   */
  name: string;

  /**
   * Whether the item is currently highlighted
   */
  visible: boolean;

  /**
   * Opacity value
   */
  opacity?: number;

  /**
   * Tooltip text to be displayed in the stage
   */
  tooltip?: string;
}
