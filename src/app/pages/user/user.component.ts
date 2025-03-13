import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [CommonModule,FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent implements OnInit {
  utilisateurs: any[] = [];
  filteredUsers: any[] = [];
  roles: any[] = [];
  selectedRole: string = '';
  newUser = {
    name: '',
    surname: '',
    mail: '',
    pswd: '',
    role: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:5000/users').subscribe({
      next: (data) => {
        this.utilisateurs = data;
        this.filteredUsers = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs', err);
      }
    });

    this.http.get<any[]>('http://localhost:5000/roles').subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des rôles', err);
      }
    });
  }

  filterByRole() {
    this.filteredUsers = this.selectedRole
      ? this.utilisateurs.filter(user => user.role?._id === this.selectedRole)
      : this.utilisateurs;
  }

  onSubmit() {
    if (this.newUser.name && this.newUser.surname && this.newUser.mail && this.newUser.pswd && this.newUser.role) {
      const userData = {
        name: this.newUser.name,
        surname: this.newUser.surname,
        mail: this.newUser.mail,
        pswd: this.newUser.pswd,
        roleId: this.newUser.role
      };

      this.http.post('http://localhost:5000/users', userData).subscribe({
        next: (response) => {
          console.log('Utilisateur ajouté avec succès:', response);
          this.utilisateurs.push(response);
          this.filteredUsers = [...this.utilisateurs];
          this.newUser = { name: '', surname: '', mail: '', pswd: '', role: '' };
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
        }
      });
    }
  }
}