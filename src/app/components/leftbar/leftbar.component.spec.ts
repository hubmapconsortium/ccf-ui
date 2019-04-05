import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { MockComponents } from 'ng-mocks';

import { BodyIconComponent } from './icons/body-icon/body-icon.component';
import { FeedbackIconComponent } from './icons/feedback-icon/feedback-icon.component';
import { HomeIconComponent } from './icons/home-icon/home-icon.component';
import { SearchIconComponent } from './icons/search-icon/search-icon.component';
import { TissueIconComponent } from './icons/tissue-icon/tissue-icon.component';
import { LeftbarComponent } from './leftbar.component';

describe('LeftbarComponent', () => {
  let component: LeftbarComponent;
  let fixture: ComponentFixture<LeftbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftbarComponent,
        MockComponents(SearchIconComponent, HomeIconComponent, BodyIconComponent, TissueIconComponent, FeedbackIconComponent) ],
        imports: [MatIconModule, MatListModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create breadcrumb', () => {
    const breadcrumb: DebugElement = fixture.debugElement.query(By.css('.breadcrumb'));
    expect(breadcrumb).not.toBeNull();
  });

  it('should create search icon', () => {
    const searchIcon: DebugElement = fixture.debugElement.query(By.css('ccf-search-icon'));
    expect(searchIcon).not.toBeNull();
  });

  it('should create home icon', () => {
    const homeIcon: DebugElement = fixture.debugElement.query(By.css('ccf-home-icon'));
    expect(homeIcon).not.toBeNull();
  });

  it('should create body icon', () => {
    const bodyIcon: DebugElement = fixture.debugElement.query(By.css('ccf-body-icon'));
    expect(bodyIcon).not.toBeNull();
  });

  it('should create tissue icon', () => {
    const tissueIcon: DebugElement = fixture.debugElement.query(By.css('ccf-tissue-icon'));
    expect(tissueIcon).not.toBeNull();
  });

  it('should create feedback icon', () => {
    const feedbackIcon: DebugElement = fixture.debugElement.query(By.css('ccf-feedback-icon'));
    expect(feedbackIcon).not.toBeNull();
  });

  it('should toggle sidenavExpanded variable on clicking search icon', () => {
    const search: DebugElement = fixture.debugElement.query(By.css('ccf-search-icon'));
    search.nativeElement.dispatchEvent(new Event('click'));
    expect(component.sidenavExpanded).toBeFalsy();
  });

});
