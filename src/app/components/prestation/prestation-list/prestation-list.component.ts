import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prestation-list',
  imports: [],
  templateUrl: './prestation-list.component.html',
  styleUrl: './prestation-list.component.css'
})
export class PrestationListComponent {
  @Input() prestations: any[] = []; 
}
