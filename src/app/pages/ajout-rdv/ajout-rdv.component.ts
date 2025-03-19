import { AuthService } from '@/services/auth.service';
import { PrestationService } from '@/services/prestation.service';
import { RdvService } from '@/services/rdv.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-ajout-rdv',
  imports: [CommonModule ,FormsModule],
  templateUrl: './ajout-rdv.component.html',
  styleUrl: './ajout-rdv.component.css'
})
export class AjoutRdvComponent {
  prestation: any[] = [];
  formData = {
    prestationId: '',
    dateTime: ''
  };
  constructor(private authService: AuthService, private rdvService: RdvService, private prestationService: PrestationService, private router: Router) {}

  ngOnInit() {
    this.prestationService.getPrestations().subscribe({
      next: (data) => {
        this.prestation = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des préstations', err);
      }
    });
  }

  onSubmit(): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error("Utilisateur non connecté !");
      return;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const clientId = decodedToken.userId;

      if (!this.formData.prestationId || !this.formData.dateTime) {
        console.error("Tous les champs sont requis !");
        return;
      }

      const dateTime = new Date(this.formData.dateTime);
      const formattedDate = dateTime.toISOString().split('T')[0];
      const formattedTime = dateTime.toTimeString().slice(0, 5);

      const requestData = {
        clientId,
        prestationId: this.formData.prestationId,
        date: formattedDate,
        heure: formattedTime
      };

      this.rdvService.addRdv(requestData).subscribe(
        response => {
          console.log("Réservation réussie !", response);
          alert("Réservation réussie !");
          this.formData = {
            prestationId: '',
            dateTime: ''
          };
        },
        error => {
          console.error("Erreur lors de la réservation :", error);
          alert("Erreur lors de la réservation !");
        }
      );
    } catch (err) {
      console.error("Erreur lors du décodage du token :", err);
      alert("Erreur lors de la réservation !");
    }
  }
}