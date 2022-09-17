
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CalenderComponent } from './Components/calender/calender.component';
import { TimesheetComponent } from './Components/timesheet/timesheet.component';
import { GestionUserComponent } from './Components/gestion-user/gestion-user.component';
import { GestionProjetComponent } from './Components/gestion-projet/gestion-projet.component';
import { ProjetTacheComponent } from './Components/projet-tache/projet-tache.component';
import { TacheComponent } from './Components/tache/tache.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { ForbiddenComponent } from './Forbidden/forbidden/forbidden.component';
import { IsAuthGuard } from './guard/is-auth.guard';
import { ProjetModificationComponent } from './Components/projet-modification/projet-modification.component';
import { EventModificationComponent } from './Components/event-modification/event-modification.component';
import { UserModificationComponent } from './Components/user-modification/user-modification.component';
import { DashboardGuard } from './guard/dashboard.guard';
import { ProjectGuard } from './guard/project.guard';
import { UserGuard } from './guard/user.guard';



const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,canActivate:[DashboardGuard] },
  { path: 'calender', component: CalenderComponent },
  { path: 'tache', component: TacheComponent },
  { path: 'login', component: LoginComponent },
  { path: 'timesheet', component: TimesheetComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },
  //pour gestion de projet
  { path: 'gestion-projet', component: GestionProjetComponent,canActivate:[ProjectGuard] },
  { path: 'projet-tache/:id_Project', component: ProjetTacheComponent,canActivate:[ProjectGuard] },
  { path: 'projet-modification/:id_Project', component: ProjetModificationComponent,canActivate:[ProjectGuard]},

  //pour gestion de users
  { path: 'gestion-user', component: GestionUserComponent,canActivate:[UserGuard] },
  {path:'user-modification',component:UserModificationComponent,canActivate:[UserGuard]},
 //pour gestion des event
 { path: 'event-modification', component: EventModificationComponent,canActivate:[UserGuard] },




  { path: '', redirectTo: 'calender', pathMatch: 'full' }


];


@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

