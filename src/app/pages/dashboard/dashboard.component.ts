import { StatCardComponent } from '@/dashboard/stat-card/stat-card.component';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from "../../shared/bar-chart/bar-chart.component";
import { TotalIncomeByMonth } from '@/interfaces/total-income-by-month';

@Component({
  selector: 'app-dashboard',
  imports: [StatCardComponent, CommonModule, BarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  totalIncome = 0;
  incomeService : any[] = [];
  totalIncomeYear: any[] = [];
  mecanicienPerf: any[] = [];

  constructor(private dashboardService: DashboardService){}

  ngOnInit(): void {
   this.loadIncomeService();
   this.loadTotalIncome();
   this.loadTotalIncomeYear();
   this.loadMecanicienPerf();
  }

  loadTotalIncome(): void{
    this.dashboardService.loadTotalIncome().subscribe(data => this.totalIncome = data[0].totalIncome.$numberDecimal);
  }

  loadIncomeService():void{
    this.dashboardService.loadIncomeService().subscribe(data => this.incomeService = data);
  }

  loadTotalIncomeYear():void{
    this.dashboardService.loadTotalIncomeYear().subscribe((data: TotalIncomeByMonth[]) => {
      for (let index = 0; index <= 11; index++) {
        let found  = false
        for(let item of data){
          let id = item._id - 1;
          if(id == index){

            this.totalIncomeYear.push(item.totalIncome.$numberDecimal)
            found = true;
            break;
          }
        }
        if(!found) {

          this.totalIncomeYear.push(0)
        }  
      }

    });
  }

  loadMecanicienPerf():void{
    this.dashboardService.loadMecanicienPerf().subscribe(data => this.mecanicienPerf = data);
  }

}
