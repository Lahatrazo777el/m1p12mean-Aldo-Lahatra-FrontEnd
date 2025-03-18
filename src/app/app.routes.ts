import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { TypeVehiculeComponent } from './pages/type-vehicule/type-vehicule.component';
import { VehiculeComponent } from './pages/vehicule/vehicule.component';
import { PrestationComponent } from './pages/prestation/prestation.component';
import { CreatePrestationComponent } from './pages/create-prestation/create-prestation.component';
import { EditPrestationComponent } from './pages/edit-prestation/edit-prestation.component';
import { CreateRepairHistoryComponent } from './pages/create-repair-history/create-repair-history.component';

export const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'home', component: HomeComponent },
          { path: 'prestations', component: PrestationComponent },
          { path: 'prestations/create', component: CreatePrestationComponent},
          { path: 'prestations/:id', component: EditPrestationComponent},
          { path: 'repair-histories/create', component: CreateRepairHistoryComponent},
          { path: 'user', component: UserComponent },
          { path: 'type-vehicule', component: TypeVehiculeComponent},
          { path: 'prestation', component: PrestationComponent },
          { path: 'vehicule', component: VehiculeComponent},
          { path: '', redirectTo: '/home', pathMatch: 'full'},
        ]
    },
    { path: '**', component: PageNotFoundComponent}
];
