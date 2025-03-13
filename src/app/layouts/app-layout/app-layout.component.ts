import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyHeaderComponent } from '../../shared/my-header/my-header.component';
import { MyFooterComponent } from '../../shared/my-footer/my-footer.component';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, MyHeaderComponent, MyFooterComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
  
})
export class AppLayoutComponent {

}
