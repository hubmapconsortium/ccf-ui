import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcfComponentsComponent } from './ccf-components.component';

describe('CcfComponentsComponent', () => {
  let component: CcfComponentsComponent;
  let fixture: ComponentFixture<CcfComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcfComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcfComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
