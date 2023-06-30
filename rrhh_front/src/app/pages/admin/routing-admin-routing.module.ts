import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AgregarComponent } from './agregar/agregar.component';
import { AppEmpleadoEmpleadoComponent } from './empleado/app-empleado';
import { routes_Empleado } from './empleado/routing-empleado-routing.module';
import { CredentialsComponent } from './credentials/credentials.component';

export const routes_Admin: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'agregar', component: AgregarComponent },
  {
    path: 'empleado/:id',
    component: AppEmpleadoEmpleadoComponent,
    children: routes_Empleado,
  },
  { path: 'editar', component: CredentialsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];
