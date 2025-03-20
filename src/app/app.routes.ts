import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { TypeVehiculeComponent } from './pages/type-vehicule/type-vehicule.component';
import { VehiculeComponent } from './pages/vehicule/vehicule.component';
import { PrestationComponent } from './pages/prestation/prestation.component';
import { AjoutRdvComponent } from './pages/ajout-rdv/ajout-rdv.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';

export const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'inscription', component: InscriptionComponent },
          { path: 'home', component: HomeComponent },
          { path: 'user', component: UserComponent },
          { path: 'type-vehicule', component: TypeVehiculeComponent},
          { path: 'prestation', component: PrestationComponent },
          { path: 'vehicule', component: VehiculeComponent},
          { path: 'ajout-rendezvous', component: AjoutRdvComponent},
          { path: '', redirectTo: '/home', pathMatch: 'full'},
        ]
    },
    { path: '**', component: PageNotFoundComponent}
];
