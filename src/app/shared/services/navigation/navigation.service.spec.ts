import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let router: Router;
  let service: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(),
        NgxsRouterPluginModule.forRoot(),
        NgxsDispatchPluginModule.forRoot(),
        RouterTestingModule
      ]
    });
  });

  beforeEach(() => {
    router = TestBed.get(Router);
    service = TestBed.get(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('navigateToTissue(idOrNode)', () => {
    let navigateSpy: jasmine.Spy;

    beforeEach(() => {
      navigateSpy = spyOn(router, 'navigate');
    });

    beforeEach(() => {
      service.navigateToTissue('tissue-identifier');
    });

    it('navigates to the specified tissue using the angular router', () => {
      expect(navigateSpy).toHaveBeenCalled();
    });
  });
});
