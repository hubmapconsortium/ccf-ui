import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { CallToActionModel, CallToActionState } from './call-to-action.state';

import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StateContext } from '@ngxs/store';
import { DocumentationContent, InfoButtonService } from '../../components/info/info-button/info-button.service';

describe('CallToActionState', () => {
  let dialog: jasmine.SpyObj<MatDialog>;
  let ga: jasmine.SpyObj<GoogleAnalyticsService>;
  let storage: jasmine.SpyObj<LocalStorageService>;
  let ctx: jasmine.SpyObj<StateContext<CallToActionModel>>;
  let state: CallToActionState;
  let infoService: InfoButtonService;
  let http: HttpClient;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    dialog = jasmine.createSpyObj<MatDialog>(['open', 'closeAll']);
    ga = jasmine.createSpyObj<GoogleAnalyticsService>(['event']);
    storage = jasmine.createSpyObj<LocalStorageService>(['getItem', 'setItem']);
    ctx = jasmine.createSpyObj<StateContext<CallToActionModel>>([
      'getState', 'setState', 'patchState', 'dispatch'
    ]);
    http = jasmine.createSpyObj<HttpClient>(['get']);


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CallToActionState
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    infoService = jasmine.createSpyObj<InfoButtonService>(['parseMarkdown']);

    state = new CallToActionState(dialog, ga, storage, infoService, http);
  });

  afterEach(() => {
    httpTestingController.verify();
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


    it('opens info dialog box', () => {
     
      state.learnMore(ctx);
      const req = httpTestingController.expectOne('assets/docs/SPATIAL_SEARCH_README.md');
      req.flush('data');
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
