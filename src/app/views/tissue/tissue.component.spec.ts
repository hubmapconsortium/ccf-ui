import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TissueComponent } from './tissue.component';

describe('TissueComponent', () => {
  let component: TissueComponent;
  let fixture: ComponentFixture<TissueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TissueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
