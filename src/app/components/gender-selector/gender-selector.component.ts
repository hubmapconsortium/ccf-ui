import { Component } from '@angular/core';

import { SearchService } from '../../shared/services/search/search.service';

@Component({
  selector: 'ccf-gender-selector',
  templateUrl: './gender-selector.component.html',
  styleUrls: ['./gender-selector.component.scss']
})
export class GenderSelectorComponent {
  constructor(private search: SearchService) { }

  selectionChanged(value: 'male' | 'female' | 'male-female'): void {
    const gender = value !== 'male-female' ? value : undefined;
    this.search.setGender(gender);
  }
}
