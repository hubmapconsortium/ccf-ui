import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageState } from '../../core/store/page/page.state';
import { ModelState } from '../../core/store/model/model.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ccf-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.scss']
})
export class RegistrationModalComponent implements OnInit {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-registration-modal';

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.openDialog();
  }

  openDialog() {
    this.dialog.open(RegistrationContent);
  }

}

@Component({
  selector: 'ccf-registration-content',
  templateUrl: 'registration-content.html',
  styleUrls: ['./registration-content.scss']
})
export class RegistrationContent {

  constructor(
    readonly page: PageState,
    readonly model: ModelState,
  ) {}

  readonly sexByLabel$ = this.model.sex$.pipe(
    map(sex => sex === 'female' ? 'Female' : 'Male')
  );

  setSexFromLabel(label: 'Female' | 'Male'): void {
    this.model.setSex(label === 'Female' ? 'female' : 'male');
  }
}
