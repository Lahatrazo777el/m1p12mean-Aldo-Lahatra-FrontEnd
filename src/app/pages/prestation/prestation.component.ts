import { AuthService } from '@/services/auth.service';

import { PrestationService } from '@/services/prestation.service';
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PrestationListComponent } from '@/components/prestation/prestation-list/prestation-list.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-prestation',
  imports: [CommonModule, PrestationListComponent, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './prestation.component.html',
  styleUrl: './prestation.component.css'
})
export class PrestationComponent implements OnInit {
  prestations: any[] = [];
  searchTerm: string = ''; 
  page: number = 1;
  limit = 10;
  total = 10;
  isLoading = true;
  searchControl = new FormControl('');

  constructor(private prestationService: PrestationService, public authService: AuthService){}

  ngOnInit(): void {
    this.loadPrestations();

    this.searchControl.valueChanges
    .pipe(
      debounceTime(500),        // Wait 500ms after each keystroke
      distinctUntilChanged()    // Only emit if value changed
    )
    .subscribe((searchTerm: any) => {
      this.filterData(searchTerm);
    });
  }

  changePage(event: any){
    this.page = event;
    this.loadPrestations({
      page: this.page,
      search: this.searchTerm,
    })
  }

  loadPrestations(params?: any): void{
    this.isLoading = true;
    this.prestationService.getPrestations(params).subscribe({
      next: (response) => {
        const data = response;
        this.isLoading = false;
        this.page = data.page;
        this.prestations = data.data;
        this.limit = data.limit;
        this.total = data.total;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  filterData(searchTerm: any): void{
    this.searchTerm = searchTerm;
    this.loadPrestations({search: searchTerm});
  }

  deleteService(serviceId: string): void{
    this.prestationService.deletePrestation(serviceId).subscribe(() => this.loadPrestations());
  }
    
}
