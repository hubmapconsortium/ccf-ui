import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageState } from '../../../core/store/page/page.state';
import { RegistrationContentComponent } from '../registration-content/registration-content.component';


/**
 * Registration modal that appears on startup
 */
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
  constructor(public dialog: MatDialog, private pageState: PageState) {}

  /**
   * Opens the dialog on startup (but not in embedded mode)
   */
  ngOnInit(): void {
    setTimeout(() => {
      if (!this.pageState.snapshot.embedded) {
        this.openDialog();
      }
    }, 1000);
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

