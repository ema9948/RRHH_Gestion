import { Routes } from '@angular/router';
import { InicioComponent } from './home/inicio.component';
import { RecibosEmpleadoComponent } from './recibos/recibos.empleado.component';
import { EditarCrendialesEmComponent } from './editar-crendiales-em/editar-crendiales-em.component';

export const routes_Empleado: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'recibos', component: RecibosEmpleadoComponent },
  { path: 'editar', component: EditarCrendialesEmComponent },
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];
