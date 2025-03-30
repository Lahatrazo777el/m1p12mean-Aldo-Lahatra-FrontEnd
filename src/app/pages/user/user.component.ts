import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '@/services/user.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule,FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent implements OnInit {
  showEditModal = false;
  selectedUser: any = {};

  utilisateurs: any[] = [];
  filteredUsers: any[] = [];

  paginatedUsers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  roles: any[] = [];
  selectedRole: string = '';
  newUser = {
    name: '',
    surname: '',
    mail: '',
    pswd: '',
    role: ''
  };

  constructor(private userService: UserService,private http: HttpClient) {}

  ngOnInit() {
    this.userService.getAllUser().subscribe({
      next: (data) => {
        this.utilisateurs = data;
        this.filteredUsers = data;
        this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
        this.updatePaginatedUsers();
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

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  changePage(direction: 'next' | 'previous') {
    if (direction === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (direction === 'previous' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.updatePaginatedUsers();
  }

  filterByRole() {
    if (this.selectedRole) {
      this.filteredUsers = this.utilisateurs.filter(user => user.role?._id === this.selectedRole);
    } else {
      this.filteredUsers = this.utilisateurs;
    }
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedUsers();
  }

  openEditModal(user: any) {
    this.selectedUser = { ...user };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  onUpdateUser() {
    this.userService.updateUser(this.selectedUser._id,this.selectedUser).subscribe({
      next: (response) => {
        console.log('Utilisateur mis à jour', response);
        this.closeEditModal();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', err);
      }
    });
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

      this.userService.addUser(userData).subscribe({
        next: (response) => {
          console.log('Utilisateur ajouté avec succès:', response);
          this.utilisateurs.push(response);
          this.filteredUsers = [...this.utilisateurs];
          this.newUser = { name: '', surname: '', mail: '', pswd: '', role: '' };
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout de l'utilisateur:", err);
        }
      });
    }
  }

  onDelete(userId: string) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          console.log('Utilisateur supprimé avec succès');
          this.utilisateurs = this.utilisateurs.filter(user => user._id !== userId);
          this.filteredUsers = [...this.utilisateurs];
        },
        error: (err) => {
          console.error("Erreur lors de la suppression de l'utilisateur:", err);
        }
      });
    }
  }
}