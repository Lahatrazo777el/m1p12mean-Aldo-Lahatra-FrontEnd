import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-modal',
  imports: [],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() action = new EventEmitter<void>();

  closeModal(): void {
	  this.close.emit();
  }

  onSubmit(): void{
    this.action.emit();
  }
}
