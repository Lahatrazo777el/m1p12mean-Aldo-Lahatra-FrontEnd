import { PrestationService } from '@/services/prestation.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-footer',
  imports: [RouterLink, DatePipe],
  templateUrl: './my-footer.component.html',
  styleUrl: './my-footer.component.css'
})
export class MyFooterComponent implements OnInit{
  currentDate: Date = new Date();
  prestations: any[] = [];

  constructor(private prestationService: PrestationService) {}

  ngOnInit(): void {
    this.loadPrestations();
  }

  loadPrestations():void{
    this.prestationService.getPrestations({limit: 5}).subscribe(data =>  this.prestations = data);
  }
}
