import { DashboardService } from '@/services/dashboard.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  countData: any = {};
  mecanicienDispo: any = {};

  monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  countClientPerMonth: any[] = [];
  chart: any;

  countRdvPerMonth: any[] = [];
  rdvChart: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.dashboardService.getCountUser().subscribe(data => {
      this.countData = data;
    });

    this.dashboardService.getMecanicienDispoNow().subscribe(data => {
      this.mecanicienDispo = data;
    });

    this.dashboardService.getCountClientPerMonth().subscribe(data => {
      this.countClientPerMonth = data;
      this.createClientChart();
    });

    this.getCountRendezVousPerMonth();
  }

  createClientChart(): void {
    const ctx = document.getElementById('clientChart') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.countClientPerMonth.map(item => `${this.monthNames[item._id.month - 1]} ${item._id.year}`);
    const dataValues = this.countClientPerMonth.map(item => item.totalClients);

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Clients',
          data: dataValues,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          borderRadius: 8,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { 
          duration: 1000,
          easing: 'easeInOutQuart'
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mois/Année'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Nombre de Clients'
            },
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  getCountRendezVousPerMonth(): void {
    this.dashboardService.getCountRendezVousPerMonth().subscribe((data: any) => {
      const labels = data.map((item: any) => `${this.monthNames[item._id.month - 1]} ${item._id.year}`);
      const rdvFalseData = data.map((item: any) => item.totalRdvFalse);
      const rdvTrueData = data.map((item: any) => item.totalRdvTrue);

      this.createRdvChart(labels, rdvFalseData, rdvTrueData);
    });
  }

  createRdvChart(labels: string[], rdvFalseData: number[], rdvTrueData: number[]): void {
    const ctx = document.getElementById('rdvChart') as HTMLCanvasElement;

    if (this.rdvChart) {
      this.rdvChart.destroy();
    }

    this.rdvChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Rendez-vous Confirmés',
            data: rdvTrueData,
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: 'green'
          },
          {
            label: 'Rendez-vous Annulés',
            data: rdvFalseData,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: 'red'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mois/Année'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Nombre de Rendez-vous'
            },
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
}