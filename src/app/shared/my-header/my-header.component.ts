import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-header',
  imports: [RouterLink],
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
