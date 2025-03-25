import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRepairHistoryComponent } from './show-repair-history.component';

describe('ShowRepairHistoryComponent', () => {
  let component: ShowRepairHistoryComponent;
  let fixture: ComponentFixture<ShowRepairHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowRepairHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowRepairHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
