import { Component } from '@angular/core';
import cheet from 'cheet.js';

import { OrganDataService } from '../../shared/services/organ-data/organ-data.service';

/** Whether to show the 3D demo. Toggled by the key sequence "3d" */
let is3D = false;
cheet('3 d', () => is3D = !is3D);

/**
 * Displays an organ with overlays.
 */
@Component({
  selector: 'ccf-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss']
})
export class OrganComponent {
  /**
   * Metadata that is shown on the right hand side table.
   */
  activeMetadata: [{ [label: string]: string }] | [] = [];

  /** Whether to show the 3D demo. */
  get is3D(): boolean { return is3D; }

  /**
   * Creates an instance of organ component.
   *
   * @param dataService Service used to fetch organ related data for display.
   */
  constructor(public readonly dataService: OrganDataService) { }

  /**
   * Appends an 's' to the end of a suffix if the count is not one.
   *
   * @param count The item count.
   * @param suffix The singular suffix.
   * @returns The pluralized suffix.
   */
  pluralizeSuffix(count: number, suffix: string): string {
    return `${suffix}${count !== 1 ? 's' : ''}`;
  }

  /**
   * Creates a string of the count with a suffix that has been pluralized.
   *
   * @param count The item count.
   * @param suffix The singular suffix.
   * @returns The count string.
   */
  pluralize(count: number, suffix: string): string {
    return `${count} ${this.pluralizeSuffix(count, suffix)}`;
  }
}
