import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit{
  @Input() totalIncomeYear: any[] = [];
  public chart: any;

  ngOnInit(): void {
    this.createChart();
    // Optional: Simulate data arriving later
    setTimeout(() => {
      console.log('Data after delay:', this.totalIncomeYear);
      if (this.chart) {
        this.chart.data.datasets[0].data = [...this.totalIncomeYear];
        this.chart.update();
      }
    }, 2000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalIncomeYear'] && !changes['totalIncomeYear'].firstChange) {
      this.updateChart();
    }
  }

  createChart(){
    if (this.chart) {
      this.chart.destroy(); // Destroy existing chart first
    }

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Janvier', 'Février', 'Mars','Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre' ], 
           datasets: [
          {
            label: "Revenu",
            data: [...this.totalIncomeYear],
            backgroundColor: 'blue'
          },  
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = [...this.totalIncomeYear];
      this.chart.update();
    }
  }

}
