import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {AuthService} from '@/services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './my-header.component.html',
  styleUrl: './my-header.component.css'
})
export class MyHeaderComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn = false;
  role: string | null = null;

  private authSubscription: Subscription = new Subscription;
  private roleSubscription: Subscription = new Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void{
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      }
    );

    this.roleSubscription = this.authService.role$.subscribe((
      role
    ) => {
      this.role = role;
    })
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout():void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
