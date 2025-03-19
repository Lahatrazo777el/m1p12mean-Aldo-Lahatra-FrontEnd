import { RepairHistoryService } from './../../services/repair-history.service';
import { FormsModule } from '@angular/forms';
import { PrestationService } from './../../services/prestation.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '@/services/user.service';
import { getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-repair-history',
  imports: [FormsModule],
  templateUrl: './create-repair-history.component.html',
  styleUrl: './create-repair-history.component.css'
})
export class CreateRepairHistoryComponent implements OnInit {
  prestations: any[] = [];
  clients: any[] = [];
  mecaniciens: any[] = [];

  history = {prestationId: '', clientId: '', mecanicienId: '', vehiculeId: ''}
  constructor(private prestationService: PrestationService, private userService: UserService, private repairHistoryService: RepairHistoryService, private router: Router){}

  ngOnInit(): void {
    this.loadPrestations(); 
    this.loadClient();
    this.loadMecanicien();
  }

  loadPrestations(params?: any): void{
    this.prestationService.getPrestations(params).subscribe(data => this.prestations = data);
  }

  loadClient(): void{
    this.userService.getUserByRole('Client').subscribe(data => this.clients = data);
  }

  loadMecanicien(): void{
    this.userService.getUserByRole('Mecanicien').subscribe(data =>  this.mecaniciens = data);
  }

  onSubmit(): void{
    console.log(this.history);
    this.repairHistoryService.addRepairHistory(this.history).subscribe(() => this.router.navigate(['/repair-histories']));
  }
}
