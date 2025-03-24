import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicienDispoComponent } from './mecanicien-dispo.component';

describe('MecanicienDispoComponent', () => {
  let component: MecanicienDispoComponent;
  let fixture: ComponentFixture<MecanicienDispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MecanicienDispoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecanicienDispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
