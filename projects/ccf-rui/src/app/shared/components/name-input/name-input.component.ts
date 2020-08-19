import { Component, EventEmitter, HostBinding, Output } from '@angular/core';

export interface UserName {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'ccf-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.scss']
})
export class NameInputComponent {

  @HostBinding('class') readonly clsName = 'ccf-name-input';

  @Output() readonly valuesChange = new EventEmitter<UserName>();

  userName: UserName = {
    firstName: '',
    lastName: ''
  }

  updateName(input: InputEvent, key: string): void {
    const inputTarget = input.target as HTMLInputElement;
    this.userName = { ...this.userName, [key]: +inputTarget.value };
    this.valuesChange.emit(this.userName);
  }
}
