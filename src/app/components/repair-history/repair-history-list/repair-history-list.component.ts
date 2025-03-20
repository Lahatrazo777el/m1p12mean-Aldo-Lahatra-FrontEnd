import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repair-history-list',
  imports: [DatePipe],
  templateUrl: './repair-history-list.component.html',
  styleUrl: './repair-history-list.component.css'
})
export class RepairHistoryListComponent {
  @Input() repairHistories: any[] = [];
}
