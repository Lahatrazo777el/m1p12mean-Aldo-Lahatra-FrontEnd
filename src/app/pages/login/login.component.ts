import { AuthService } from '@/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule ,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  mail: string = '';
  pswd: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.mail, this.pswd).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/prestations']);
      },
      error: (error) => {
        alert(error.error.message || 'Erreur de connexion');
      }
    });
  }
}
