import { Component } from '@angular/core';

import { SearchService } from '../../shared/services/search/search.service';

/**
 * Component for selecting a searched gender.
 */
@Component({
  selector: 'ccf-gender-selector',
  templateUrl: './gender-selector.component.html',
  styleUrls: ['./gender-selector.component.scss']
})
export class GenderSelectorComponent {
  /**
   * Creates an instance of gender selector component.
   *
   * @param search The service used to update the state.
   */
  constructor(private search: SearchService) { }

  /**
   * Updates the searched gender.
   *
   * @param value The button value that has been selected.
   */
  selectionChanged(value: 'male' | 'female' | 'male-female'): void {
    const gender = value !== 'male-female' ? value : undefined;
    this.search.setGender(gender);
  }
}
