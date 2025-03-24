import { AvisService } from './../../../services/avis.service';
import { AuthService } from './../../../services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormModalComponent } from '@/shared/form-modal/form-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-repair-history-list',
  imports: [DatePipe, CommonModule, FormModalComponent, FormsModule],
  templateUrl: './repair-history-list.component.html',
  styleUrl: './repair-history-list.component.css'
})
export class RepairHistoryListComponent {
  @Input() repairHistories: any[] = [];
  isModalVisible = false;
  mecanicienId: string | null = null;
  avis = {note: '', commentaire: '', clientId: '', mecanicienId: ''};

  constructor(public authService: AuthService, private avisService: AvisService) {}

  showModal(id: string) {
	  this.isModalVisible = true;
    this.mecanicienId = id;
  }

  hideModal() {
	  this.isModalVisible = false;
  }

  addAvis(): void {
    if(this.mecanicienId) this.avis.mecanicienId = this.mecanicienId;
    this.avis.clientId = this.authService.getUser().userId;

    this.avisService.addAvis(this.avis).subscribe(() =>  this.hideModal());   
  }
}
