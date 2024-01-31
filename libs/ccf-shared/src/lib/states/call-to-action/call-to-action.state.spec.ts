import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { StateContext } from '@ngxs/store';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { of } from 'rxjs';

import { DocumentationContent, InfoButtonService } from '../../components/info/info-button/info-button.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { CallToActionModel, CallToActionState } from './call-to-action.state';

describe('CallToActionState', () => {
  const defaultState: CallToActionModel = {
    title: '',
    message: '',
    callToAction: '',
    imageUrl: '',
    expirationDate: 'December 22, 2000',
    popupShown: false
  };

  let dialog: jasmine.SpyObj<MatDialog>;
  let ga: jasmine.SpyObj<GoogleAnalyticsService>;
  let storage: jasmine.SpyObj<LocalStorageService>;
  let ctx: jasmine.SpyObj<StateContext<CallToActionModel>>;
  let infoService: jasmine.SpyObj<InfoButtonService>;
  let http: jasmine.SpyObj<HttpClient>;
  let state: CallToActionState;

  beforeEach(() => {
    dialog = jasmine.createSpyObj<MatDialog>(['open', 'closeAll']);
    ga = jasmine.createSpyObj<GoogleAnalyticsService>(['event']);
    storage = jasmine.createSpyObj<LocalStorageService>(['getItem', 'setItem']);
    ctx = jasmine.createSpyObj<StateContext<CallToActionModel>>([
      'getState', 'setState', 'patchState', 'dispatch'
    ]);
    http = jasmine.createSpyObj<HttpClient>(['get']);
    infoService = jasmine.createSpyObj<InfoButtonService>(['parseMarkdown']);

    state = new CallToActionState(dialog, ga, storage, infoService, http);
  });

  beforeEach(() => {
    storage.getItem.and.returnValue('');
    ctx.getState.and.returnValue({ ...defaultState, expirationDate: 'December 22,2024' });
    http.get.and.returnValue(of(''));
  });

  describe('ngxsOnInit(ctx)', () => {
    it('checks for ExpirationDate and succeeds', () => {
      const datePassed = CallToActionState.ctaDatePassed(ctx.getState().expirationDate);
      expect(datePassed).toBeFalse();
    });
  });

  it('opens info dialog box', () => {
    state.learnMore(ctx).subscribe();
    expect(ga.event).toHaveBeenCalledWith('open_learn_more', 'call_to_action');
  });

  it('opens CTA dialog box', () => {
    state.open(ctx);
    expect(ga.event).toHaveBeenCalledWith('open', 'call_to_action');
  });

  it('closes dialog box', () => {
    state.close(ctx);
    expect(ga.event).toHaveBeenCalledWith('close', 'call_to_action');
  });

  it('checks for ExpirationDate and fails', () => {
    const datePassed = CallToActionState.ctaDatePassed(defaultState.expirationDate);
    expect(datePassed).toBeTrue();
  });

  it('opoens dialog box', () => {
    const markdownContent: DocumentationContent[] = [];
    state.launchLearnMore(markdownContent);
    expect(dialog.open).toHaveBeenCalled();
  });
});
