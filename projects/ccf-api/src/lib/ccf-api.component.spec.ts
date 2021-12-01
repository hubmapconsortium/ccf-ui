import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcfApiComponent } from './ccf-api.component';

describe('CcfApiComponent', () => {
  let component: CcfApiComponent;
  let fixture: ComponentFixture<CcfApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcfApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcfApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
