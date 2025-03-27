import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairHistoryListComponent } from './repair-history-list.component';

describe('RepairHistoryListComponent', () => {
  let component: RepairHistoryListComponent;
  let fixture: ComponentFixture<RepairHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairHistoryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
