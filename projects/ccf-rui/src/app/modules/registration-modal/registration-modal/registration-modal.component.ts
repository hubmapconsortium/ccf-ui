import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
import { debounceTime, filter, skipUntil, take, tap } from 'rxjs/operators';

import { ModelState } from '../../../core/store/model/model.state';
import { PageState } from '../../../core/store/page/page.state';
import { ReferenceDataState } from '../../../core/store/reference-data/reference-data.state';
import { RegistrationContentComponent } from '../registration-content/registration-content.component';


/**
 * Registration modal that appears on startup
 */
// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
  selector: 'ccf-registration-modal',
  templateUrl: './registration-modal.component.html'
})
export class RegistrationModalComponent implements OnInit {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-registration-modal';

  /**
   * Creates an instance of registration modal component.
   *
   * @param dialog Dialog for the modal
   */
  constructor(
    public dialog: MatDialog,
    private readonly page: PageState,
    private readonly model: ModelState,
    private readonly referenceData: ReferenceDataState
  ) {}

  /**
   * Opens the dialog on startup (but not if cancel registration callback is set)
   */
  ngOnInit(): void {
    this.referenceData.state$.pipe(
      debounceTime(500),
      skipUntil(this.referenceData.state$.pipe(
        filter(data => Object.keys(data.organIRILookup).length > 0),
      )),
      tap(() => {
        combineLatest([this.page.user$, this.model.organ$]).pipe(
          take(1),
          tap(([user, organ]) => {
            if (user.firstName !== '' && user.lastName !== '' && organ.src !== '') {
              return;
            }
            this.openDialog();
          })
        ).subscribe();
      })
    ).subscribe();
  }

  /**
   * Opens dialog
   */
  openDialog(): void {
    this.dialog.open(RegistrationContentComponent, {
      autoFocus: false
    });
  }
}
