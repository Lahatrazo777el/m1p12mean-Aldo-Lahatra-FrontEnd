import { ActivatedRoute } from '@angular/router';
import { RepairHistoryService } from './../../services/repair-history.service';
import { Component, OnInit } from '@angular/core';
import { RepairHistoryInterface } from '@/interfaces/repair-history-interface';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-show-repair-history',
  imports: [CommonModule, DatePipe],
  templateUrl: './show-repair-history.component.html',
  styleUrl: './show-repair-history.component.css'
})

export class ShowRepairHistoryComponent implements OnInit {
  repairHistoryId: string | null = '';
  repairHistory: RepairHistoryInterface | undefined;

  constructor(private repairHistoryService: RepairHistoryService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.repairHistoryId = this.route.snapshot.paramMap.get('id');
    this.findHistory();
  }

  findHistory(){
    if(this.repairHistoryId)
    this.repairHistoryService.findRepairHistory(this.repairHistoryId).subscribe((data) => {
      this.repairHistory = data[0]
      console.log(data);
    })
  }
}
