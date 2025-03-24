import { UserService } from '@/services/user.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mecanicien-dispo',
  imports: [CommonModule,FormsModule],
  templateUrl: './mecanicien-dispo.component.html',
  styleUrl: './mecanicien-dispo.component.css'
})
export class MecanicienDispoComponent implements OnInit {
  utilisateurs: any[] = [];
  selectedDate: string = "";
  
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.chargerMecaniciens();
  }

  chargerMecaniciens() {
    this.userService.getMecaniciensByDate(this.selectedDate).subscribe({
      next: (data) => {
        this.utilisateurs = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des mécaniciens', err);
      }
    });
  }

  filtrerParDate() {
    this.chargerMecaniciens();
  }
}
