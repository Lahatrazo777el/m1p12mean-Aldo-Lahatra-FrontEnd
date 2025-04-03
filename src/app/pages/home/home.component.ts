import { AuthService } from './../../services/auth.service';
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

  constructor(private prestationService: PrestationService, public authService: AuthService){}

  ngOnInit(): void {
    this.loadPrestation();
  }  

  loadPrestation(): void{
    this.prestationService.getPrestations({limit: 4}).subscribe((data) => this.prestations = data.data);
  }
}
