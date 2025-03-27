import { UserService } from '@/services/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  imports: [CommonModule ,FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  newUser = {
    name: '',
    surname: '',
    mail: '',
    pswd: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.newUser.name && this.newUser.surname && this.newUser.mail && this.newUser.pswd) {
      const userData = {
        name: this.newUser.name,
        surname: this.newUser.surname,
        mail: this.newUser.mail,
        pswd: this.newUser.pswd
      };

      this.userService.addUser(userData).subscribe({
        next: (response) => {
          console.log('Utilisateur ajouté avec succès:', response);
          this.router.navigate(['/login']);
          alert('Inscription réussie, veuillez vous connecter');
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout de l'utilisateur:", err);
          alert('Erreur lors de l\'inscription, veuillez réessayer');
        }
      });
    }
  }
}
