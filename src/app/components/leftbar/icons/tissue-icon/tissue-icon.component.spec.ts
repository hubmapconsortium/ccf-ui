import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TissueIconComponent } from './tissue-icon.component';

describe('TissueIconComponent', () => {
  let component: TissueIconComponent;
  let fixture: ComponentFixture<TissueIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TissueIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TissueIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
