
import { PrestationService } from '@/services/prestation.service';
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PrestationListComponent } from '@/components/prestation/prestation-list/prestation-list.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prestation',
  imports: [CommonModule, PrestationListComponent, FormsModule],
  templateUrl: './prestation.component.html',
  styleUrl: './prestation.component.css'
})
export class PrestationComponent implements OnInit {
  prestations: any[] = [];
  searchTerm: string = ''; 

  constructor(private prestationService: PrestationService){}

  ngOnInit(): void {
    this.loadPrestations();
  }

  loadPrestations(params?: any): void{
    this.prestationService.getPrestations(params).subscribe(data => this.prestations = data);
  }

  filterData(): void{
    this.loadPrestations({search: this.searchTerm});
  }
}
