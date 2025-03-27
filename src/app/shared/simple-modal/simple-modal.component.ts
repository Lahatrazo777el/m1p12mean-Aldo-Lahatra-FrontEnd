import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-simple-modal',
  imports: [],
  templateUrl: './simple-modal.component.html',
  styleUrl: './simple-modal.component.css'
})
export class SimpleModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() action = new EventEmitter<void>();

  closeModal(): void {
	  this.close.emit();
  }

  onSubmit(): void{
    this.action.emit();
  }
}
