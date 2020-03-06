import { Component, EventEmitter, Output, Input } from '@angular/core';


@Component({
  selector: 'ccf-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() label: string;
  @Input() options: string[];
  @Input() selection: string;
  @Output() readonly selectionChange = new EventEmitter<string>();

  selectionChanged(value: string) {
    this.selection = value;
    this.selectionChange.emit(value);
  }
}
