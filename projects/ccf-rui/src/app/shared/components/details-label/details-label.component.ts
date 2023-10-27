import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

/**
 * Reusable component that takes an array of strings and renders
 * that array as a string, separated by commas, in the icon color.
 */
@Component({
  selector: 'ccf-details-label',
  templateUrl: './details-label.component.html',
  styleUrls: ['./details-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsLabelComponent {
  /** HTML Class Name */
  @HostBinding('class') readonly clsName = 'ccf-details-label';

  /**
   * The array of details to be displayed.
   */
  @Input() details: string[] = [];

  /**
   * Function that handles converting the array given
   * into a formatted string for display.
   *
   * @param inputArray an array of strings to join.
   * @returns the formatted string of items separated by a comma.
   */
  arrayToString(inputArray: string[]): string {
    return inputArray.filter(item => !!item).join(', ');
  }
}
