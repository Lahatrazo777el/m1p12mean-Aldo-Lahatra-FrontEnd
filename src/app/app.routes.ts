import { ShowPrestationComponent } from './pages/show-prestation/show-prestation.component';
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
import { RepairHistoryComponent } from './pages/repair-history/repair-history.component';
import { AjoutRdvComponent } from './pages/ajout-rdv/ajout-rdv.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { authGuard } from './guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { MecanicienComponent } from './pages/mecanicien/mecanicien.component';
import { ShowRepairHistoryComponent } from './pages/show-repair-history/show-repair-history.component';
import { RepairHistoryMecanoComponent } from './pages/repair-history-mecano/repair-history-mecano.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'inscription', component: InscriptionComponent },
          { path: 'home', component: HomeComponent },
          { path: 'about', component: AboutComponent },
          { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
          { path: 'mecaniciens', component: MecanicienComponent },
          { path: 'prestations', component: PrestationComponent },
          { path: 'prestations/create', component: CreatePrestationComponent, canActivate: [authGuard]},
          { path: 'prestations/:id/edit', component: EditPrestationComponent, canActivate: [authGuard]},
          { path: 'prestations/:id', component: ShowPrestationComponent },
          { path: 'repair-histories/create', component: CreateRepairHistoryComponent, canActivate: [authGuard]},
          { path: 'repair-histories/mecano', component: RepairHistoryMecanoComponent, canActivate: [authGuard]},
          { path: 'repair-histories/:id', component: ShowRepairHistoryComponent, canActivate: [authGuard] },
          { path: 'repair-histories', component: RepairHistoryComponent, canActivate: [authGuard]},
          { path: 'user', component: UserComponent },
          { path: 'type-vehicule', component: TypeVehiculeComponent},
          { path: 'vehicule', component: VehiculeComponent},
          { path: 'ajout-rendezvous', component: AjoutRdvComponent},
          { path: '', redirectTo: '/home', pathMatch: 'full'},
        ]
    },
    { path: '**', component: PageNotFoundComponent}
];
