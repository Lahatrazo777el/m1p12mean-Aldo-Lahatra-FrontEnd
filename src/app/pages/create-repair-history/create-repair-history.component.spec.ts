import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRepairHistoryComponent } from './create-repair-history.component';

describe('CreateRepairHistoryComponent', () => {
  let component: CreateRepairHistoryComponent;
  let fixture: ComponentFixture<CreateRepairHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRepairHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRepairHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
