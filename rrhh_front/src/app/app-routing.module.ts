import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './pages/admin/login/login.admin.Component';
import { RegisterComponent } from './pages/admin/register/register.component';
import { routes_Admin } from './pages/admin/routing-admin-routing.module';
import { AppAdminComponent } from './pages/admin/app-admin.component';
import { routes_Empleado } from './pages/empleado/routing-routing.module';
import { AppEmpleadoComponent } from './pages/empleado/app.empleadoComponent';
import { EmpleadoLoginComponent } from './pages/empleado/login/login.empleado.component';
import { filterAdmin, filterEmpleado } from './guards/guard.guard';
import { guardsChildren } from './guards/guards.guard';
import { SendPasswordComponentEmpl } from './pages/empleado/send-password/send-password.empleado.component';
import { ResetPasswordComponentEmpl } from './pages/empleado/reset-password/reset-password.empleado.component';
import { SendPasswordComponentAdmin } from './pages/admin/send-password/send-password.admin.component';
import { ResetPasswordComponentAdmin } from './pages/admin/reset-password/reset-password.admin.component';

const routes: Routes = [
  { path: 'admin/login', component: LoginAdminComponent },
  { path: 'admin/register', component: RegisterComponent },
  { path: 'login', component: EmpleadoLoginComponent },
  {
    path: 'admin/:id',
    component: AppAdminComponent,
    canActivateChild: [guardsChildren],
    canActivate: [filterAdmin],
    children: routes_Admin,
  },
  {
    path: 'empleado/:id',
    canActivate: [filterEmpleado],
    canActivateChild: [guardsChildren],
    component: AppEmpleadoComponent,
    children: routes_Empleado,
  },
  { path: 'sendReset', component: SendPasswordComponentEmpl },
  { path: 'reset/:token', component: ResetPasswordComponentEmpl },
  { path: 'sendReset/admin', component: SendPasswordComponentAdmin },
  { path: 'reset/admin/:token', component: ResetPasswordComponentAdmin },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
