
import { SimpleModalComponent } from '@/shared/simple-modal/simple-modal.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-prestation-list',
  imports: [RouterLink, SimpleModalComponent ],
  templateUrl: './prestation-list.component.html',
  styleUrl: './prestation-list.component.css'
})
export class PrestationListComponent {
  @Input() prestations: any[] = []; 
  @Output() delete = new EventEmitter <string>();

  serviceId: string | null = null;
  isModalVisible = false;

  constructor() {}

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
}
