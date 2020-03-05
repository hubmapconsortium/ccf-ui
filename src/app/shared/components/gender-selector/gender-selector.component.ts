import { Component, EventEmitter, Output, Input } from '@angular/core';

export type Genders = 'Both' | 'Male' | 'Female';

@Component({
  selector: 'ccf-gender-selector',
  templateUrl: './gender-selector.component.html',
  styleUrls: ['./gender-selector.component.scss']
})
export class GenderSelectorComponent {
  @Input() label: string = 'Sex';
  @Input() selected: Genders = 'Both';
  @Output() readonly selectedChange = new EventEmitter<Genders>();

  readonly genders: Genders[] = ['Both', 'Male', 'Female'];

  selectionChanged(value: Genders) {
    this.selected = value;
    this.selectedChange.emit(value);
  }
}
