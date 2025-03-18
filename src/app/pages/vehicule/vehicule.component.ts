import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import 'select2';
import { VehiculeService } from '@/services/vehicule.service';
import { UserService } from '@/services/user.service';
import { TypevehiculeService } from '@/services/typevehicule.service';

@Component({
  selector: 'app-vehicule',
  imports: [CommonModule,FormsModule, NgSelectModule],
  templateUrl: './vehicule.component.html',
  styleUrl: './vehicule.component.css'
})
export class VehiculeComponent implements AfterViewInit  {
showEditModal = false;
  selectedUser: any = {};

  utilisateurs: any[] = [];
  vehicule: any[] = [];
  typevehicule: any[] = [];
  selectedRole: string = '';

  newVehicule = {
    name: '',
    numero: '',
    typevehicule: '',
    user: ''
  };

  ngAfterViewInit() {
    setTimeout(() => {
      ($('#user') as any).select2({
        placeholder: 'Sélectionner un client',
        allowClear: true
      }).on('change', (event: any) => {
        this.newVehicule.user = event.target.value;
      });
    }, 0);
  }
  

  constructor(private vehiculeService: VehiculeService,private userService: UserService,private typeVehiculeService: TypevehiculeService,private http: HttpClient) {}

  ngOnInit() {
    this.userService.getUserByRole('Client').subscribe({
      next: (data) => {
        this.utilisateurs = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs', err);
      }
    });

    this.typeVehiculeService.getAllTypeVehicule().subscribe({
      next: (data) => {
        this.typevehicule = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des types vehicules', err);
      }
    });

    this.vehiculeService.getAllVehicule().subscribe({
      next: (data) => {
        this.vehicule = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des vehicules', err);
      }
    });
  }

  onSubmit() {
    if (this.newVehicule.name && this.newVehicule.numero && this.newVehicule.typevehicule && this.newVehicule.user) {
      const vehiculeData = {
        name: this.newVehicule.name,
        number: this.newVehicule.numero,
        typevehiculeId: this.newVehicule.typevehicule,
        userId: this.newVehicule.user
      };
  
      this.vehiculeService.addVehicule(vehiculeData).subscribe({
        next: (response) => {
          console.log('Véhicule ajouté avec succès:', response);
          this.vehicule.push(response);
          this.newVehicule = { name: '', numero: '', user: '', typevehicule: '' };
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du véhicule:', err);
  
          if (err.error && err.error.message) {
            alert(`Erreur du serveur : ${err.error.message}`);
          } else {
            alert('Une erreur inattendue s\'est produite.');
          }
        }
      });
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }
  
  onDelete(vehiculeId: string) {
    if (confirm('Voulez-vous vraiment supprimer cet vehicule ?')) {
      this.vehiculeService.deleteVehicule(vehiculeId).subscribe({
        next: () => {
          console.log('vehicule supprimé avec succès');
          this.vehicule = this.vehicule.filter(v => v._id !== vehiculeId);
        },
        error: (err) => {
          console.error("Erreur lors de la suppression du vehicule:", err);
        }
      });
    }
  }

}
