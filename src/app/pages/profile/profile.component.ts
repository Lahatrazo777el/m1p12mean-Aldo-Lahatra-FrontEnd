import { VehiculeService } from './../../services/vehicule.service';
import { AuthService } from '@/services/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  private userId: any = null;
  public user: any = null;
  initials: string = '';
  isLoading = true;
  vehiculeIsLoading = true;
  vehicules: any[] = [];

  private userSubscription: Subscription = new Subscription;
  constructor(private userService : UserService, private authService : AuthService, private vehiculeService: VehiculeService){}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.userId = user?.userId;
    }) 

    this.getUser();
    this.getVehicule();
  }

  getUser(): void{
    this.isLoading = true;
    this.userService.findUser(this.userId).subscribe({
      next: (response) => {
        const data = response;
        this.isLoading = false;
        this.user = data
        this.getInitials(data);
        
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  getInitials(data: any) {
    this.initials = data.name[0].charAt(0).toUpperCase() + data.surname[0].charAt(0).toUpperCase();
  }

  getVehicule(){
    this.vehiculeIsLoading =  true;
    this.vehiculeService.findVehicule(this.userId).subscribe(data => {
      this.vehicules = data
      this.vehiculeIsLoading = false;
    })
  }
}
