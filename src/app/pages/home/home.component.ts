import { PrestationService } from '@/services/prestation.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  prestations: any[] = [];
  days: any[] = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];

  constructor(private prestationService: PrestationService){}

  ngOnInit(): void {
    this.loadPrestation();
  }  

  loadPrestation(): void{
    this.prestationService.getPrestations().subscribe((data) => this.prestations = data);
  }
}
