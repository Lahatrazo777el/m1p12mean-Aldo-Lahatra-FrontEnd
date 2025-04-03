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
  isUserMenuOpen = false;
  isLoggedIn = false;
  role: string | null = null;
  userName: string = '';

  private authSubscription: Subscription = new Subscription;
  private roleSubscription: Subscription = new Subscription;
  private userSubscription: Subscription = new Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void{

    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      }
    );

    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.userName = user?.name;
    }) 

    this.roleSubscription = this.authService.role$.subscribe((
      role
    ) => {
      this.role = role;
    })

  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUserMenu(){
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(event : Event):void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
