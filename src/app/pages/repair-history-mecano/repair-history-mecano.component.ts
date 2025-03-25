import { RepairHistoryListComponent } from '@/components/repair-history/repair-history-list/repair-history-list.component';
import { AuthService } from '@/services/auth.service';
import { RepairHistoryService } from '@/services/repair-history.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-repair-history-mecano',
  imports: [FormsModule, RepairHistoryListComponent],
  templateUrl: './repair-history-mecano.component.html',
  styleUrl: './repair-history-mecano.component.css'
})
export class RepairHistoryMecanoComponent implements OnInit {
  repairHistories = [];
  searchTerm: string = ''; 

  constructor(private repairHistoryService: RepairHistoryService, public authService: AuthService){}
  
  ngOnInit(): void {
    this.loadRepairHistory();
    console.log(this.repairHistories);
  }

  filterData(): void{
    this.loadRepairHistory({search: this.searchTerm});
  }

  loadRepairHistory(params?: any): void{
    const user = this.authService.getUser();
    this.repairHistoryService.getRepairHistoriesMecano(user.userId,params).subscribe(data => this.repairHistories = data);
  }
}
