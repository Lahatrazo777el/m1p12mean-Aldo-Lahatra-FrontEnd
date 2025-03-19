import { RepairHistoryService } from './../../services/repair-history.service';
import { RepairHistoryListComponent } from '@/components/repair-history/repair-history-list/repair-history-list.component';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-repair-history',
  imports: [RepairHistoryListComponent, FormsModule, RouterLink],
  templateUrl: './repair-history.component.html',
  styleUrl: './repair-history.component.css'
})
export class RepairHistoryComponent implements OnInit{
  repairHistories = [];
  searchTerm: string = ''; 

  constructor(private repairHistoryService: RepairHistoryService){}
  
  ngOnInit(): void {
    this.loadRepairHistory();
    console.log(this.repairHistories);
  }

  filterData(): void{
    this.loadRepairHistory({search: this.searchTerm});
  }

  loadRepairHistory(params?: any): void{
    this.repairHistoryService.getRepairHistories(params).subscribe(data => this.repairHistories = data);
  }
}
