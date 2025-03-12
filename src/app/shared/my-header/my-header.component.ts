import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-header',
  imports: [],
  templateUrl: './my-header.component.html',
  styleUrl: './my-header.component.css'
})
export class MyHeaderComponent implements OnInit {
  isMenuOpen = false;

  constructor() {}

  ngOnInit(): void{}

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }
}
