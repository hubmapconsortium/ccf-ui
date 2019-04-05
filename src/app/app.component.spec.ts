import { async, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { MainModule } from './views/main/main.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MainModule,
        MatDialogModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
