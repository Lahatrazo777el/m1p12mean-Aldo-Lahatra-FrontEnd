
import { PrestationService } from '@/services/prestation.service';
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prestation',
  imports: [CommonModule],
  templateUrl: './prestation.component.html',
  styleUrl: './prestation.component.css'
})
export class PrestationComponent implements OnInit {
  prestations: any[] = [];
  constructor(private prestationService: PrestationService){}

  ngOnInit(): void {
    this.loadPrestations();
  }

  loadPrestations(): void{
    this.prestationService.getPrestations().subscribe(data => this.prestations = data);
  }

}
