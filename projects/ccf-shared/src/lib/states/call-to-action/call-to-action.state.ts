import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { CallToActionBehaviorComponent } from '../../components/call-to-action-behavior/call-to-action-behavior.component';
import { InfoDialogComponent } from '../../components/info/info-dialog/info-dialog.component';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { CloseDialog, LearnMore, OpenDialog } from './call-to-action.actions';


export interface CallToActionModel {
  title: string;
  message: string;
  callToAction: string;
  imageUrl: string;
  expirationDate: string;
  popupShown: boolean;

}


const POPUP_SHOWN_STORAGE_KEY = 'callToActionPopupShown';


@State<CallToActionModel>({
  name: 'callToAction',
  defaults: {
    title: 'New to the Exploration User Interface',
    message: 'Spatial Search has arrived!',
    callToAction: 'Learn More',
    imageUrl: 'assets/images/spatial_search.png',
    expirationDate: 'Dec 1, 2022',
    popupShown: false
  }
})
@Injectable()
export class CallToActionState implements NgxsOnInit {
  static ctaDatePassed(expirationDate: string, now = Date.now): boolean {
    const today = now();
    const expire = new Date(expirationDate);

    return +today > +expire;
  }

  constructor(
    private readonly dialog: MatDialog,
    private readonly ga: GoogleAnalyticsService,
    private readonly storage: LocalStorageService
  ) { }

  ngxsOnInit(ctx: StateContext<CallToActionModel>): void {
    const { expirationDate, popupShown } = ctx.getState();
    const popupShownStr = this.storage.getItem(POPUP_SHOWN_STORAGE_KEY, `${popupShown}`);
    const pastExpiration = CallToActionState.ctaDatePassed(expirationDate);
    const showPopup = popupShownStr !== 'true' && !pastExpiration;

    if (showPopup) {
      ctx.dispatch(new OpenDialog());
    }
  }

  @Action(LearnMore)
  learnMore(_ctx: StateContext<CallToActionModel>): void {
    this.dialog.closeAll();
    this.dialog.open(InfoDialogComponent, {
      autoFocus: false,
      panelClass: 'modal-animated',
      width: '72rem',
      data: {
        title: 'Spatial Search',
        content: [{
          title: 'InfoDialogComponent Needs Updated',
          content: 'So that you can open it without first parsing the markdown in <assets/docs/SPATIAL_SEARCH_README.md>.'
            + 'You should be able to pass the md url and it work with that.'
        }],
        videoID: 'N2JUogY-DQw'
      }
    });

    this.ga.event('open_learn_more', 'call_to_action');
  }

  @Action(OpenDialog)
  open(ctx: StateContext<CallToActionModel>): void {
    this.dialog.open(CallToActionBehaviorComponent, {
      autoFocus: false,
      panelClass: 'modal-animated',
      width: '22rem'
    });

    this.ga.event('open', 'call_to_action');
    this.storage.setItem(POPUP_SHOWN_STORAGE_KEY, 'true');
    ctx.patchState({ popupShown: true });
  }

  @Action(CloseDialog)
  close(_ctx: StateContext<CallToActionModel>): void {
    this.dialog.closeAll();
    this.ga.event('close', 'call_to_action');
  }
}
