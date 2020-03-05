import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'ccf-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() label: string;
  @Input() options: string;
  @Input() selected: string;
  @Output() readonly selectedChange = new EventEmitter<string>();

  selectionChanged(value: string) {
    this.selected = value;
    this.selectedChange.emit(value);
  }

  convertOptions(options: string) {
    return options.slice(1, options.length-1).split(', ');
  }
}
