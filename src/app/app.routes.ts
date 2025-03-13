import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { PrestationComponent } from './pages/prestation/prestation.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent, // Applying default layout
    children: [
          { path: '', redirectTo: '/home', pathMatch: 'full'},
          { path: 'login', component: LoginComponent },
          { path: 'home', component: HomeComponent },
          { path: 'prestation', component: PrestationComponent },
        ]
    },
    { path: '**', component: PageNotFoundComponent}
];
