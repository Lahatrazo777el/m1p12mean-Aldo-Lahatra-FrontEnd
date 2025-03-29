import { AuthService } from '@/services/auth.service';
import { RepairHistoryService } from './../../services/repair-history.service';
import { RepairHistoryListComponent } from '@/components/repair-history/repair-history-list/repair-history-list.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-repair-history',
  imports: [RepairHistoryListComponent, FormsModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './repair-history.component.html',
  styleUrl: './repair-history.component.css'
})
export class RepairHistoryComponent implements OnInit{
  repairHistories = [];
  searchControl = new FormControl('');
  page: number = 1;
  limit = 10;
  total = 10;
  searchTerm: string = '';
  isLoading = false;

  constructor(private repairHistoryService: RepairHistoryService, public authService: AuthService){}
  
  ngOnInit(): void {
    this.loadRepairHistory();
     this.searchControl.valueChanges
    .pipe(
      debounceTime(500),        // Wait 500ms after each keystroke
      distinctUntilChanged()    // Only emit if value changed
    )
    .subscribe((searchTerm: any) => {
      this.filterData(searchTerm);
    });
  }

  filterData(searchTerm: any): void{
    this.searchTerm = searchTerm;
    this.loadRepairHistory({search: searchTerm});
  }

  changePage(event: any){
    this.page = event;
    this.loadRepairHistory({
      page: this.page,
      search: this.searchTerm,
    })
  }

  loadRepairHistory(params?: any): void{
    const userId = this.authService.getUser().userId;
    if(this.authService.isClient){
      this.repairHistoryService.getRepairHistoriesClient(userId,params).subscribe({
        next: (response) => {
          const data = response;
          this.isLoading = false;
          this.page = data.page;
          this.repairHistories = data.data;
          this.limit = data.limit;
          this.total = data.total;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    } else {

      this.repairHistoryService.getRepairHistories(params).subscribe({
        next: (response) => {
          const data = response;
          this.isLoading = false;
          this.page = data.page;
          this.repairHistories = data.data;
          this.limit = data.limit;
          this.total = data.total;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }
}
