import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-car-carousel',
  imports: [CommonModule],
  templateUrl: './car-carousel.component.html',
  styleUrl: './car-carousel.component.css'
})
export class CarCarouselComponent {
  images = [
    'images/proxy-image.jpeg',
    'images/proxy-image1.jpeg',
    'images/proxy-image2.jpeg',
    'images/proxy-image3.jpeg',
    'images/proxy-image4.jpeg',
  ];

  currentIndex = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
