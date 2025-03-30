import { RepairHistoryListComponent } from '@/components/repair-history/repair-history-list/repair-history-list.component';
import { AuthService } from '@/services/auth.service';
import { RepairHistoryService } from '@/services/repair-history.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-repair-history-mecano',
  imports: [FormsModule, RepairHistoryListComponent, ReactiveFormsModule],
  templateUrl: './repair-history-mecano.component.html',
  styleUrl: './repair-history-mecano.component.css'
})
export class RepairHistoryMecanoComponent implements OnInit {
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
    const user = this.authService.getUser();
    this.repairHistoryService.getRepairHistoriesMecano(user.userId,params).subscribe({
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
