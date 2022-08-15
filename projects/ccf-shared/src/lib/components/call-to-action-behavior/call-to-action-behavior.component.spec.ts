import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Shallow } from 'shallow-render';

import { CloseDialog, LearnMore } from '../../states/call-to-action/call-to-action.actions';
import { CallToActionBehaviorComponent } from './call-to-action-behavior.component';
import { CallToActionBehaviorModule } from './call-to-action-behavior.module';



describe('CallToActionBehaviorComponent', () => {
  let shallow: Shallow<CallToActionBehaviorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()]
    });

    shallow = new Shallow(CallToActionBehaviorComponent, CallToActionBehaviorModule)
      .dontMock(Store)
      .import(NgxsModule.forRoot([]));
  });

  it('should emit on call to action click', async () => {
    const { instance } = await shallow.render();
    expect(instance.learnMore()).toEqual(jasmine.any(LearnMore));
  });

  it('should emit on close click', async () => {
    const { instance } = await shallow.render();
    expect(instance.close()).toEqual(jasmine.any(CloseDialog));
  });
});
