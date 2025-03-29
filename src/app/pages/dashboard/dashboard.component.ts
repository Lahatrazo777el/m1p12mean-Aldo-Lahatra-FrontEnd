import { StatCardComponent } from '@/dashboard/stat-card/stat-card.component';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from "../../shared/bar-chart/bar-chart.component";
import { TotalIncomeByMonth } from '@/interfaces/total-income-by-month';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [StatCardComponent, CommonModule, BarChartComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  totalIncome: any = 0;
  incomeService : any[] = [];
  totalIncomeYear: any[] = [];
  mecanicienPerf: any[] = [];
  totalIncomePeriod: string = '';

  period : string = '';

  constructor(private dashboardService: DashboardService){}

  ngOnInit(): void {
   this.loadIncomeService();
   this.loadTotalIncome();
   this.loadTotalIncomeYear();
   this.loadMecanicienPerf();
  }

  loadTotalIncome(params?: any): void{
    this.dashboardService.loadTotalIncome(params).subscribe(data => this.totalIncome = data[0] ? data[0].totalIncome.$numberDecimal : 0);
  }

  filterIncome(): void{
    this.loadTotalIncome({period: this.totalIncomePeriod});
  }

  loadIncomeService(params?: any):void{
    this.dashboardService.loadIncomeService(params).subscribe(data => this.incomeService = data);
  }

  getServiceStat(period: string):void{
    let param = {period: period};
    this.period = period;
    this.loadIncomeService(param)
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
