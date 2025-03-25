import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mecanicien',
  imports: [],
  templateUrl: './mecanicien.component.html',
  styleUrl: './mecanicien.component.css'
})
export class MecanicienComponent implements OnInit{
  users: any[] = [];
  constructor(private userService: UserService){}
  ngOnInit(): void {
      this.loadUsers();
  }

  loadUsers(): void{
    this.userService.getTeam().subscribe((data) => this.users = data);
  }
}
