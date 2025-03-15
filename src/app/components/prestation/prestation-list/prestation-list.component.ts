import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-prestation-list',
  imports: [RouterLink],
  templateUrl: './prestation-list.component.html',
  styleUrl: './prestation-list.component.css'
})
export class PrestationListComponent {
  @Input() prestations: any[] = []; 
}
