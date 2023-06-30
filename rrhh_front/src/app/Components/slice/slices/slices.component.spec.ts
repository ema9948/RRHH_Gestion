import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlicesComponent } from './slices.component';

describe('SlicesComponent', () => {
  let component: SlicesComponent;
  let fixture: ComponentFixture<SlicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlicesComponent]
    });
    fixture = TestBed.createComponent(SlicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
