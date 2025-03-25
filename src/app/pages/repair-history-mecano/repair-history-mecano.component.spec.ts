import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairHistoryMecanoComponent } from './repair-history-mecano.component';

describe('RepairHistoryMecanoComponent', () => {
  let component: RepairHistoryMecanoComponent;
  let fixture: ComponentFixture<RepairHistoryMecanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairHistoryMecanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairHistoryMecanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
