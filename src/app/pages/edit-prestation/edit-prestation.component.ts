import { PrestationService } from '@/services/prestation.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-prestation',
  imports: [FormsModule],
  templateUrl: './edit-prestation.component.html',
  styleUrl: './edit-prestation.component.css'
})
export class EditPrestationComponent implements OnInit{
  prestation = {name: '', price: 0, duration: '00:00'};
  prestationId: null | string = null;

  errorMsg: string = '';

  constructor(private route: ActivatedRoute, private prestationService: PrestationService, private router: Router){}

  ngOnInit(): void {
    this.prestationId = this.route.snapshot.paramMap.get('id');

    this.findPrestation();
  }

  findPrestation(): void{
    if(this.prestationId){

      this.prestationService.findPrestation(this.prestationId).subscribe((data) => {
       
        this.prestation.name = data.name;
        this.prestation.price = data.price.$numberDecimal;
        this.prestation.duration = this.formatDuration(data.duration) ?? '00:00';
      });
    }
  }

  updatePrestation(): void{
    if(this.prestationId){
      this.prestationService.updatePrestation(this.prestationId, this.prestation).subscribe({
        next: () => {
          this.router.navigate(['/prestations']);
        },
        error: (error) => {
  
          if(error.status == 400){
            this.errorMsg = error.error.message;
          }
        }
      })
    }
  }

  formatDuration(totalMinutes: Number): string | null {
    if (typeof totalMinutes !== 'number' || totalMinutes < 0) {
      return null; // Invalid input
    }
  
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}`;
  }
  
}
