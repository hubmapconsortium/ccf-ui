import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  dialogOpen = false;

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
    combineLatest([this.page.state$, this.model.state$, this.referenceData.state$]).pipe(
      tap(([page, model, data]) => {
        if (this.dialogOpen) {
          return;
        }
        if (!page.pageLoaded) {
          return;
        }
        if (Object.keys(data.organIRILookup).length === 0) {
          return;
        }
        if (page.user.firstName !== '' && page.user.lastName !== '' && model.organ.src !== '') {
          return;
        }
        this.dialogOpen = true;
        this.openDialog();
      })
    ).subscribe();
  }

  /**
   * Opens dialog
   */
  openDialog(): void {
    this.dialog.open(RegistrationContentComponent, {
      autoFocus: false,
    });
  }
}
