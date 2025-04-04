import { Component } from '@angular/core';
import { CarCarouselComponent } from "../../components/about/car-carousel/car-carousel.component";

@Component({
  selector: 'app-about',
  imports: [CarCarouselComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
