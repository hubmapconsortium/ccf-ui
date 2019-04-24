import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TissueSearchComponent } from './tissue-search.component';

describe('TissueSearchComponent', () => {
  let component: TissueSearchComponent;
  let fixture: ComponentFixture<TissueSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TissueSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TissueSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
