import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { MockModule } from 'ng-mocks';

import { LeftbarComponent } from './leftbar.component';

describe('LeftbarComponent', () => {
  let component: LeftbarComponent;
  let fixture: ComponentFixture<LeftbarComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MockModule(MatIconModule)],
      declarations: [LeftbarComponent]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create search icon', () => {
    const searchIcon: DebugElement = fixture.debugElement.query(By.css('.search'));
    expect(searchIcon).not.toBeNull();
  });

  it('should create home icon', () => {
    const homeIcon: DebugElement = fixture.debugElement.query(By.css('.home'));
    expect(homeIcon).not.toBeNull();
  });

  it('should create body icon', () => {
    const bodyIcon: DebugElement = fixture.debugElement.query(By.css('.body'));
    expect(bodyIcon).not.toBeNull();
  });

  it('should create tissues browser icon', () => {
    const tissueIcon: DebugElement = fixture.debugElement.query(By.css('.tissues-browser'));
    expect(tissueIcon).not.toBeNull();
  });

  it('should create feedback icon', () => {
    const feedbackIcon: DebugElement = fixture.debugElement.query(By.css('.feedback'));
    expect(feedbackIcon).not.toBeNull();
  });

  it('should toggle sidenavExpanded variable on clicking search icon', () => {
    const search: DebugElement = fixture.debugElement.query(By.css('.search'));
    search.triggerEventHandler('click', { });
    expect(component.sidenavExpanded).toBeFalsy();
  });
});
