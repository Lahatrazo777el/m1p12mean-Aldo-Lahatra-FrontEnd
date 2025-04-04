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
  mail: string = 'test@gmail.com';
  pswd: string = 'password';
  loading: boolean = false;
  selectedOption: string = 'client';

  constructor(private authService: AuthService, private router: Router) {}

  onOptionChange() {
    this.changeLoginCredentials(this.selectedOption);
  }

  changeLoginCredentials(value: string){
    switch(value){
      case 'client':
        this.mail = 'test@gmail.com';
        break;
      case 'mecanicien':
        this.mail = 'test.mecanicien@gmail.com';
        break;
      default:
        this.mail = 'test.manager@gmail.com';
        break;
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.authService.login(this.mail, this.pswd).subscribe({
      next: (response) => {
        this.loading = false;
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        alert(error.error.message || 'Erreur de connexion');
        this.loading = false;
      }
    });
  }
}
