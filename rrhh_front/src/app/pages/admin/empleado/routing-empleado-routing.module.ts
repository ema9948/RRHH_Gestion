import { Routes } from '@angular/router';
import { DetallesComponent } from './detalles/detalles.component';
import { RecibosComponent } from './recibos/recibos.component';
import { EditarDatosComponent } from './editar/editar-datos/editar-datos.component';
import { EditarCredencialesComponent } from './editar/editar-credenciales/editar-credenciales.component';

export const routes_Empleado: Routes = [
  { path: 'detalles', component: DetallesComponent },
  { path: 'recibos', component: RecibosComponent },
  { path: 'editar/datos', component: EditarDatosComponent },
  { path: 'editar/credenciales', component: EditarCredencialesComponent },
  { path: '', pathMatch: 'full', redirectTo: 'detalles' },
  { path: '**', pathMatch: 'full', redirectTo: 'detalles' },
];
