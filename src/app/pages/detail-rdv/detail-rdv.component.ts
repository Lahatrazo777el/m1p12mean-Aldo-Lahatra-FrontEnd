import { RdvService } from '@/services/rdv.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-rdv',
  imports: [CommonModule],
  templateUrl: './detail-rdv.component.html',
  styleUrl: './detail-rdv.component.css'
})
export class DetailRdvComponent implements OnInit {
  appointments: any[] = [];
  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();
  daysInMonth: Date[] = [];

  constructor(private rdvService: RdvService) {}

  ngOnInit(): void {
    this.loadRdv();
    this.generateDaysOfMonth();
  }

  loadRdv(): void {
    this.rdvService.getrdv().subscribe((data) => {
      this.appointments = data;
      this.generateDaysOfMonth();
    });
  }
  
  generateDaysOfMonth(): void {
    this.daysInMonth = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const currentDate = new Date(this.currentYear, this.currentMonth, day);
      this.daysInMonth.push(currentDate);
    }
  }

  navigateMonth(direction: string): void {
    if (direction === 'next') {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    } else if (direction === 'prev') {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    }
    this.generateDaysOfMonth();
    this.loadRdv();
  }

  getColor(appointment: any): string {
    if (appointment.date_annulation) {
      return 'rgb(252, 155, 138)';
    } else if (appointment.type === true) {
      return 'rgb(34, 197, 94)';
    }
    return 'rgb(237, 242, 247)';
  }

  isAppointmentOnDay(day: Date): boolean {
    return this.appointments.some(appointment => {
      const appointmentDate = new Date(appointment.date_rdv);
      return appointmentDate.getDate() === day.getDate() &&
        appointmentDate.getMonth() === this.currentMonth &&
        appointmentDate.getFullYear() === this.currentYear;
    });
  }

  getAppointmentsForDay(day: Date): any[] {
    return this.appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date_rdv);
      return appointmentDate.getDate() === day.getDate() &&
        appointmentDate.getMonth() === this.currentMonth &&
        appointmentDate.getFullYear() === this.currentYear;
    });
  }

  selectedAppointment: any = null;

openModal(appointment: any): void {
  this.selectedAppointment = appointment;
}

closeModal(): void {
  this.selectedAppointment = null;
}

validateAppointment(): void {
  console.log("Rendez-vous validé:", this.selectedAppointment);
  this.rdvService.validaterdv(this.selectedAppointment._id).subscribe(() => {
    this.loadRdv();
  });
  this.closeModal();
}

cancelAppointment(): void {
  console.log("Rendez-vous annulé:", this.selectedAppointment);
  this.rdvService.cancelrdv(this.selectedAppointment._id).subscribe(() => {
    this.loadRdv();
  });
  this.closeModal();
}
}