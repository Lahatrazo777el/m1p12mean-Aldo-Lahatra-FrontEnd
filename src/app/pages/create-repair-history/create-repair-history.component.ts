import { VehiculeService } from '@/services/vehicule.service';
import { RepairHistoryService } from './../../services/repair-history.service';
import { FormsModule } from '@angular/forms';
import { PrestationService } from './../../services/prestation.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '@/services/user.service';
import { getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-repair-history',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-repair-history.component.html',
  styleUrl: './create-repair-history.component.css'
})
export class CreateRepairHistoryComponent implements OnInit {
  prestations: any[] = [];
  clients: any[] = [];
  mecaniciens: any[] = [];
  vehiculeClient: any[] = [];
  errorMsg: string = '';

  history = {prestationId: '', clientId: '', mecanicienId: '', vehiculeId: ''}
  constructor(private prestationService: PrestationService, private userService: UserService, private repairHistoryService: RepairHistoryService, private router: Router, private vehiculeService: VehiculeService){}

  ngOnInit(): void {
    this.loadPrestations(); 
    this.loadClient();
    this.loadMecanicien();
  }

  loadPrestations(params?: any): void{
    this.prestationService.getPrestations(params).subscribe(data => this.prestations = data.data);
  }

  loadClient(): void{
    this.userService.getUserByRole('Client').subscribe(data => this.clients = data);
  }

  loadMecanicien(): void{
    this.userService.getUserByRole('Mecanicien').subscribe(data =>  this.mecaniciens = data);
  }

  onSubmit(): void{
    this.repairHistoryService.addRepairHistory(this.history).subscribe({
      next: () => {
        this.router.navigate(['/repair-histories']);
      },
      error: (error) => {
        // Handle the error here
        console.error('Error adding repair history:', error);

        // this.errorMessage = 'Failed to add...';
        if(error.status == 400){
          this.errorMsg = error.error.message;
        }
      }
    });
  }

  onClientChange(): void {

    this.vehiculeService.findVehicule(this.history.clientId).subscribe((data) =>  this.vehiculeClient = data);
  }
}
