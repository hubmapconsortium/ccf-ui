import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkCardsComponent } from './link-cards.component';

describe('LinkCardsComponent', () => {
  let component: LinkCardsComponent;
  let fixture: ComponentFixture<LinkCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
