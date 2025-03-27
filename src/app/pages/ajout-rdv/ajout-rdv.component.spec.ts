import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRdvComponent } from './ajout-rdv.component';

describe('AjoutRdvComponent', () => {
  let component: AjoutRdvComponent;
  let fixture: ComponentFixture<AjoutRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutRdvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
