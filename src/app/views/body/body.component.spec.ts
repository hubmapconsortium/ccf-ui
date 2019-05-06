import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink } from '@angular/router';
import { of as rxOf, Subscription } from 'rxjs';
import { MockComponent } from 'ng-mocks';

import { BodyDataService } from '../../shared/services/body-data/body-data.service';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { BodyComponent } from './body.component';
import { MetadataModule } from '../../components/metadata/metadata.module';
import { CalloutModule } from '../../components/callout/callout.module';

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CalloutModule, MetadataModule ],
      declarations: [ BodyComponent, MockComponent(RouterLink) ],
      providers: [
        { provide: BodyDataService,
          useValue: {
            getBodySourcePath: () => rxOf(''),
            getMetadata: () => rxOf({}),
            getBodyOverlays: () => rxOf([])
          }
        },
        { provide: NavigationService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should capitalize the string value', () => {
    expect(component.capitalize('hello')).toBe('Hello');
  });

  it('should capitalize the uppercase value', () => {
    expect(component.capitalize('HELLO')).toBe('Hello');
  });

  it('should clear subscription and metadata.', () => {
    component.metadata = { string : 'kidney'};
    component.hoverOrganName = 'kidney';
    component.metadataSubscription = new Subscription();
    const unsubscriptionSpy = spyOn(component.metadataSubscription, 'unsubscribe');
    unsubscriptionSpy.and.callFake(() => {});
    component.clearOrganHover();
    expect(component.metadata).toBeUndefined();
    expect(component.hoverOrganName).toBeUndefined();
    expect(unsubscriptionSpy).toHaveBeenCalled();
  });
});
