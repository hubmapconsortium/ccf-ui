import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { CallToActionModel, CallToActionState } from './call-to-action.state';

import { StateContext } from '@ngxs/store';


describe('CallToActionState', () => {
  let dialog: jasmine.SpyObj<MatDialog>;
  let ga: jasmine.SpyObj<GoogleAnalyticsService>;
  let storage: jasmine.SpyObj<LocalStorageService>;
  let ctx: jasmine.SpyObj<StateContext<CallToActionModel>>;
  let state: CallToActionState;


  beforeEach(() => {
    dialog = jasmine.createSpyObj<MatDialog>(['open', 'closeAll']);
    ga = jasmine.createSpyObj<GoogleAnalyticsService>(['event']);
    storage = jasmine.createSpyObj<LocalStorageService>(['getItem', 'setItem']);
    ctx = jasmine.createSpyObj<StateContext<CallToActionModel>>([
      'getState', 'setState', 'patchState', 'dispatch'
    ]);
    state = new CallToActionState(dialog, ga, storage);
  });

  describe('ngxsOnInit(ctx)', () => {
    const defaultState: CallToActionModel = {
      title: '',
      message: '',
      callToAction: '',
      imageUrl: '',
      expirationDate: 'December 22, 2000',
      popupShown: false
    };


    it('opens learn more dialog box', () => {
      state.learnMore(ctx);
      expect(ga.event).toHaveBeenCalledWith('open_learn_more', 'call_to_action');
    });

    it('opens dialog box', () => {
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


    beforeEach(() => {
      storage.getItem.and.returnValue('');
      ctx.getState.and.returnValue({ ...defaultState, expirationDate: 'December 22,2024' });
    });

    it('checks for ExpirationDate and succeeds', () => {
      const datePassed = CallToActionState.ctaDatePassed(ctx.getState().expirationDate);
      expect(datePassed).toBeFalse();
    });

  });

});
