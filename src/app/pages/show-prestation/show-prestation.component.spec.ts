import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPrestationComponent } from './show-prestation.component';

describe('ShowPrestationComponent', () => {
  let component: ShowPrestationComponent;
  let fixture: ComponentFixture<ShowPrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPrestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
