import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCrendialesEmComponent } from './editar-crendiales-em.component';

describe('EditarCrendialesEmComponent', () => {
  let component: EditarCrendialesEmComponent;
  let fixture: ComponentFixture<EditarCrendialesEmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCrendialesEmComponent]
    });
    fixture = TestBed.createComponent(EditarCrendialesEmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
