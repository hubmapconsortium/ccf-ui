import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CallToActionBehaviorComponent } from '../../components/call-to-action-behavior/call-to-action-behavior.component';
import {
  DocumentationContent,
  InfoButtonService,
} from '../../components/info/info-button/info-button.service';
import { InfoDialogComponent } from '../../components/info/info-dialog/info-dialog.component';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { CloseDialog, LearnMore, OpenDialog } from './call-to-action.actions';

/**
 * Interface to hold the necessary parts of the CTA dialog
 */
export interface CallToActionModel {
  title: string;
  message: string;
  callToAction: string;
  imageUrl: string;
  expirationDate: string;
  popupShown: boolean;
}

/**
 * Key for boolean determining if poup has been shown
 */
const POPUP_SHOWN_STORAGE_KEY = 'callToActionPopupShown';

/**
 * Path to readme markup doc
 */
const SPATIAL_SEARCH_README = 'assets/docs/SPATIAL_SEARCH_README.md';

/**
 * Sets the necessary defaults for the dialog box
 */
@State<CallToActionModel>({
  name: 'callToAction',
  defaults: {
    title: 'New to the Exploration User Interface',
    message: 'Spatial Search has arrived!',
    callToAction: 'Learn More',
    imageUrl: 'assets/images/spatial_search.gif',
    expirationDate: 'Dec 1, 2022',
    popupShown: false,
  },
})
/**
 * State that controls the data and behavior for the CallToAction Component
 */
@Injectable()
export class CallToActionState implements NgxsOnInit {
  /**
   * Function that determines if expiration date has passed
   * @param expirationDate
   * @param now
   * @returns boolean defining whether or not info popup has expiered
   */
  static ctaDatePassed(expirationDate: string, now = Date.now): boolean {
    const today = now();
    const expire = new Date(expirationDate);

    return +today > +expire;
  }

  constructor(
    private readonly dialog: MatDialog,
    private readonly ga: GoogleAnalyticsService,
    private readonly storage: LocalStorageService,
    private readonly infoService: InfoButtonService,
    private readonly http: HttpClient
  ) {}

  ngxsOnInit(ctx: StateContext<CallToActionModel>): void {
    const { expirationDate, popupShown } = ctx.getState();
    const popupShownStr = this.storage.getItem(
      POPUP_SHOWN_STORAGE_KEY,
      `${popupShown}`
    );
    const pastExpiration = CallToActionState.ctaDatePassed(expirationDate);
    const showPopup = popupShownStr !== 'true' && !pastExpiration;
    if (showPopup) {
      ctx.dispatch(new OpenDialog());
    }
  }

  /**
   * Returns observable containting info from the markup
   */
  private getDialogData(): Observable<DocumentationContent[]> {
    return this.http
      .get(SPATIAL_SEARCH_README, { responseType: 'text' })
      .pipe(map((data) => this.infoService.parseMarkdown(data)));
  }

  /**
   * Opens Learn more dialog
   */
  launchLearnMore(content: DocumentationContent[]): void {
    this.dialog.open(InfoDialogComponent, {
      autoFocus: false,
      panelClass: 'modal-animated',
      width: '72rem',
      data: {
        title: 'Spatial Search',
        content: content,
        videoID: 'UfxMpzatowE',
      },
    });
  }

  /**
   * Handles click event box
   * @param _ctx
   */
  @Action(LearnMore)
  learnMore(
    _ctx: StateContext<CallToActionModel>
  ): Observable<DocumentationContent[]> {
    this.dialog.closeAll();
    this.ga.event('open_learn_more', 'call_to_action');

    return this.getDialogData().pipe(tap((data) => this.launchLearnMore(data)));
  }

  /**
   * Opens dialog box
   * @param ctx
   */
  @Action(OpenDialog)
  open(ctx: StateContext<CallToActionModel>): void {
    this.dialog.open(CallToActionBehaviorComponent, {
      autoFocus: false,
      panelClass: 'modal-animated',
      width: '30.75rem',
      height: '36.688rem',
    });

    this.ga.event('open', 'call_to_action');
    this.storage.setItem(POPUP_SHOWN_STORAGE_KEY, 'true');
    ctx.patchState({ popupShown: true });
  }

  /**
   * closes all dialog boxes
   * @param _ctxs;
   */
  @Action(CloseDialog)
  close(_ctx: StateContext<CallToActionModel>): void {
    this.dialog.closeAll();
    this.ga.event('close', 'call_to_action');
  }
}
