import { PrestationService } from './../../services/prestation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-repair-history',
  imports: [],
  templateUrl: './create-repair-history.component.html',
  styleUrl: './create-repair-history.component.css'
})
export class CreateRepairHistoryComponent implements OnInit {
  prestations: any[] = [];

  constructor(private prestationService: PrestationService){}

  ngOnInit(): void {
    this.loadPrestations(); 
  }

  loadPrestations(params?: any): void{
    this.prestationService.getPrestations(params).subscribe(data => this.prestations = data);
  }
}
