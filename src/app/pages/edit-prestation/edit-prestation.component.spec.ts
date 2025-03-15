import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrestationComponent } from './edit-prestation.component';

describe('EditPrestationComponent', () => {
  let component: EditPrestationComponent;
  let fixture: ComponentFixture<EditPrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPrestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
