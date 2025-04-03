import { PrestationService } from './../../services/prestation.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-prestation',
  imports: [FormsModule],
  templateUrl: './create-prestation.component.html',
  styleUrl: './create-prestation.component.css'
})
export class CreatePrestationComponent {
  prestation = {name: '', price: '', duration: '00:00'};
  errorMsg: string = '';
  isAdding = false;

  constructor(private prestationService: PrestationService, private router: Router) {}

  onSubmit():void {
    this.isAdding = true;
    this.prestationService.addPrestation(this.prestation).subscribe({
      next: () => {
        this.router.navigate(['/prestations']);
      },
      error: (error) => {

        if(error.status == 400){
          this.errorMsg = error.error.message;
        }
        this.isAdding = false;
      }
    })
   
  }
}
