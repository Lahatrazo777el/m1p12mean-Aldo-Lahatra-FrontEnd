import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrestationComponent } from './create-prestation.component';

describe('CreatePrestationComponent', () => {
  let component: CreatePrestationComponent;
  let fixture: ComponentFixture<CreatePrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePrestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
