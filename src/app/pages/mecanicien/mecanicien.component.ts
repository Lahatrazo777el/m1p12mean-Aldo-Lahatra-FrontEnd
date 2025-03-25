import { CommonModule } from '@angular/common';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mecanicien',
  imports: [CommonModule],
  templateUrl: './mecanicien.component.html',
  styleUrl: './mecanicien.component.css'
})
export class MecanicienComponent implements OnInit{
  users: any[] = [];
  isLoading = true;
  
  constructor(private userService: UserService){}
  
  ngOnInit(): void {
      this.loadUsers();
  }

  loadUsers(): void{
    this.isLoading = true;

    this.userService.getTeam().subscribe({
      next:(response) => {
        this.users = response
        this.isLoading = false
      },
      error: (err) => {
        this.isLoading = false

      }
    });
  }
}
