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
export class VehiculeComponent implements AfterViewInit {
  showEditModal = false;
  selectedUser: any = {};

  utilisateurs: any[] = [];
  vehicule: any[] = [];
  typevehicule: any[] = [];
  selectedRole: string = '';

  paginatedVehicules: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

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
        this.totalPages = Math.ceil(this.vehicule.length / this.itemsPerPage);
        this.updatePaginatedVehicule();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des vehicules', err);
      }
    });
  }

  updatePaginatedVehicule() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedVehicules = this.vehicule.slice(startIndex, endIndex);
  }

  changePage(direction: 'next' | 'previous') {
    if (direction === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (direction === 'previous' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.updatePaginatedVehicule();
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
          this.totalPages = Math.ceil(this.vehicule.length / this.itemsPerPage);
          this.updatePaginatedVehicule();
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
          this.totalPages = Math.ceil(this.vehicule.length / this.itemsPerPage);
          this.updatePaginatedVehicule();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression du vehicule:", err);
        }
      });
    }
  }
}

