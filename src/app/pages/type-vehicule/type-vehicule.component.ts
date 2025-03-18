import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypevehiculeService } from '@/services/typevehicule.service';

@Component({
  selector: 'app-type-vehicule',
  imports: [CommonModule,FormsModule],
  templateUrl: './type-vehicule.component.html',
  styleUrl: './type-vehicule.component.css'
})
export class TypeVehiculeComponent {
  TypeVehicule: any[] = [];
  newTypeVehicule = {
    name: ''
  };

    constructor(private typeVehiculeService: TypevehiculeService) {}

    ngOnInit() {
      this.typeVehiculeService.getAllTypeVehicule().subscribe({
        next: (data) => {
          this.TypeVehicule = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des Types Vehicules', err);
        }
      });
    }

  onSubmit() {
    if (this.newTypeVehicule.name) {
      const typeVehiculeData = {
        name: this.newTypeVehicule.name
      };

      this.typeVehiculeService.addTypeVehicule(typeVehiculeData).subscribe({
        next: (response) => {
          console.log('Type Vehicule ajouté avec succès:', response);
          this.TypeVehicule.push(response);
          this.TypeVehicule = [...this.TypeVehicule];
          this.newTypeVehicule = { name: ''};
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
        }
      });
    }
  }
}
