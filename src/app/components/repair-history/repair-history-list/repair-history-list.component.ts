import { AvisService } from './../../../services/avis.service';
import { AuthService } from './../../../services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormModalComponent } from '@/shared/form-modal/form-modal.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-repair-history-list',
  imports: [DatePipe, CommonModule, FormModalComponent, FormsModule, RouterLink, NgxPaginationModule],
  templateUrl: './repair-history-list.component.html',
  styleUrl: './repair-history-list.component.css'
})
export class RepairHistoryListComponent {
  @Input() repairHistories: any[] = [];
  @Output() reload = new EventEmitter<any>();
  @Input() page: any = 1; 
  @Input() count: any = 1; 
  isModalVisible = false;
  mecanicienId: string | null = null;
  repairHistoryId: string | null = null;
  avis = {note: '', commentaire: '', clientId: '', mecanicienId: '', repairHistoryId: ''};

  errorMsg = '';

  @Output() changePage = new EventEmitter <Number>();

  constructor(public authService: AuthService, private avisService: AvisService) {}

  showModal(mecanicienId: string, repairHistoryId: string) {
	  this.isModalVisible = true;
    this.mecanicienId = mecanicienId;
    this.repairHistoryId = repairHistoryId;
  }

  hideModal() {
	  this.isModalVisible = false;
  }

  addAvis(): void {
    if(this.mecanicienId) this.avis.mecanicienId = this.mecanicienId;
    if(this.repairHistoryId) this.avis.repairHistoryId = this.repairHistoryId;
    this.avis.clientId = this.authService.getUser().userId;

    this.avisService.addAvis(this.avis).subscribe({
      next: () => {
        this.hideModal();
        this.reload.emit();
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de l\'avis:', error);
        if(error.status == 400){
          this.errorMsg = error.error.message;
        }
      }
    });   
  }

  changeMyPage(event: any): void{
    console.log(event);
    this.changePage.emit(event);
  }
}
