import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockSizeInputComponent } from './block-size-input.component';

describe('BlockSizeInputComponent', () => {
  let component: BlockSizeInputComponent;
  let fixture: ComponentFixture<BlockSizeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockSizeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockSizeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
