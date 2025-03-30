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
  today: string;
  rdv: any[] = [];
  prestation: any[] = [];
  formData = {
    prestationId: '',
    dateTime: ''
  };
  constructor(
    private authService: AuthService,
    private rdvService: RdvService,
    private prestationService: PrestationService,
    private router: Router
  ) {
    const now = new Date();
    this.today = now.toISOString().slice(0, 16);
  }
  ngOnInit() {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const clientId = decodedToken.userId;
      if (!clientId) {
        console.error("utilisateur non autorisé !");
        this.router.navigate(['/login']);
        return;
      }

      this.prestationService.getPrestations().subscribe({
        next: (data) => {
          this.prestation = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des prestations', err);
        }
      });

      this.rdvService.getRdvByUser(clientId).subscribe({
        next: (data) => {
          this.rdv = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des rendez-vous', err);
        }
      });
    } catch (err) {
      console.error("Erreur lors du décodage du token :", err);
      this.router.navigate(['/login']);
    }
  }

  formatStatut(statut: boolean, date_annulation: string | null): string {
    if (!statut && date_annulation != null) {
      return '<span class="text-red-400 font-bold">Annulé</span>';
    }
    if (statut) {
      return '<span class="text-green-400 font-bold">Validé</span>';
    }
    return '<span class="text-yellow-400 font-bold">En cours</span>';
  }

  isEnCours(statut: boolean, date_annulation: string | null): boolean {
    return !statut && date_annulation == null;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
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
          this.rdv.push(response);
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

  annulerRdv(id: string): void {
    if (confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ?")) {
      this.rdvService.deleteRdvByUser(id).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.error("Erreur lors de l'annulation :", err);
          alert("Une erreur est survenue lors de l'annulation.");
        }
      });
    }
  }
}