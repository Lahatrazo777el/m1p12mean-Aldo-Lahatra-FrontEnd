import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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

    constructor(private http: HttpClient) {}

    ngOnInit() {
      this.http.get<any[]>('http://localhost:5000/typevehicule').subscribe({
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

      this.http.post('http://localhost:5000/typevehicule', typeVehiculeData).subscribe({
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
