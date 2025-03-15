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
  prestation = {name: '', price: 0, duration: '00:00'};

  constructor(private prestationService: PrestationService, private router: Router) {}

  onSubmit():void {
    this.prestationService.addPrestation(this.prestation).subscribe(() => this.router.navigate(['/prestations']))
    console.log(this.prestation);
  }
}
