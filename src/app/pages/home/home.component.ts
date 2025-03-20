import { PrestationService } from '@/services/prestation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  prestations: any[] = [];

  constructor(private prestationService: PrestationService){}

  ngOnInit(): void {
    this.loadPrestation();
  }  

  loadPrestation(): void{
    this.prestationService.getPrestations().subscribe((data) => this.prestations = data);
  }
}
