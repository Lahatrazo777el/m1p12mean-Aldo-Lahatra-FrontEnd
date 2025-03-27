import { AuthService } from '@/services/auth.service';

import { SimpleModalComponent } from '@/shared/simple-modal/simple-modal.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-prestation-list',
  imports: [RouterLink, SimpleModalComponent, CommonModule, NgxPaginationModule],
  templateUrl: './prestation-list.component.html',
  styleUrl: './prestation-list.component.css'
})
export class PrestationListComponent {
  @Input() prestations: any[] = []; 
  @Input() page: any = 1; 
  @Input() count: any = 1; 
  @Output() delete = new EventEmitter <string>();
  @Output() changePage = new EventEmitter <Number>();

  serviceId: string | null = null;
  isModalVisible = false;

  constructor(public authService: AuthService) {}

  showModal(id: string) {
    this.serviceId = id;
	  this.isModalVisible = true;
  }

  hideModal() {
	  this.isModalVisible = false;
  }

  deleteService(): void {
    if(this.serviceId) this.delete.emit(this.serviceId);
    this.hideModal();
  }

  changeMyPage(event: any): void{
    console.log(event);
    this.changePage.emit(event);
  }
}
