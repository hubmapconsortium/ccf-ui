import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologyTreeComponent } from './ontology-tree.component';

describe('OntologyTreeComponent', () => {
  let component: OntologyTreeComponent;
  let fixture: ComponentFixture<OntologyTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntologyTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
