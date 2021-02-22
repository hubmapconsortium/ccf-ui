import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonFileReaderComponent } from './json-file-reader.component';

describe('JsonFileReaderComponent', () => {
  let component: JsonFileReaderComponent;
  let fixture: ComponentFixture<JsonFileReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonFileReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonFileReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
