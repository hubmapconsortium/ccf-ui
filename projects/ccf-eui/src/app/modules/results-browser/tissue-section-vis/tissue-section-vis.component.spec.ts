import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TissueSectionVisComponent } from './tissue-section-vis.component';

describe('TissueSectionVisComponent', () => {
  let component: TissueSectionVisComponent;
  let fixture: ComponentFixture<TissueSectionVisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TissueSectionVisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TissueSectionVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
