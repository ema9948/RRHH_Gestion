import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAdminComponent } from './pages/admin/login/login.admin.Component';
import { RegisterComponent } from './pages/admin/register/register.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AppAdminComponent } from './pages/admin/app-admin.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AgregarComponent } from './pages/admin/agregar/agregar.component';
import { AppEmpleadoEmpleadoComponent } from './pages/admin/empleado/app-empleado';
import { DetallesComponent } from './pages/admin/empleado/detalles/detalles.component';
import { RecibosComponent } from './pages/admin/empleado/recibos/recibos.component';
import { SlicesComponent } from './Components/slice/slices/slices.component';
import { EditarDatosComponent } from './pages/admin/empleado/editar/editar-datos/editar-datos.component';
import { EditarCredencialesComponent } from './pages/admin/empleado/editar/editar-credenciales/editar-credenciales.component';
import { AppEmpleadoComponent } from './pages/empleado/app.empleadoComponent';
import { InicioComponent } from './pages/empleado/home/inicio.component';
import { NavbarEmpleadoComponent } from './pages/empleado/navbar-empleado/navbar-empleado.component';
import { RecibosEmpleadoComponent } from './pages/empleado/recibos/recibos.empleado.component';
import { EditarCrendialesEmComponent } from './pages/empleado/editar-crendiales-em/editar-crendiales-em.component';
import { CardEmpleadoComponent } from './Components/card-empleado/card-empleado.component';
import { EmpleadoLoginComponent } from './pages/empleado/login/login.empleado.component';
import { CredentialsComponent } from './pages/admin/credentials/credentials.component';
import { SendPasswordComponentEmpl } from './pages/empleado/send-password/send-password.empleado.component';
import { ResetPasswordComponentEmpl } from './pages/empleado/reset-password/reset-password.empleado.component';
import { SendPasswordComponentAdmin } from './pages/admin/send-password/send-password.admin.component';
import { ResetPasswordComponentAdmin } from './pages/admin/reset-password/reset-password.admin.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    FooterComponent,
    RegisterComponent,
    AppAdminComponent,
    HomeComponent,
    NavbarComponent,
    AgregarComponent,
    AppEmpleadoEmpleadoComponent,
    DetallesComponent,
    RecibosComponent,
    SlicesComponent,
    EditarDatosComponent,
    EditarCredencialesComponent,
    AppEmpleadoComponent,
    InicioComponent,
    NavbarEmpleadoComponent,
    RecibosEmpleadoComponent,
    EditarCrendialesEmComponent,
    CardEmpleadoComponent,
    EmpleadoLoginComponent,
    CredentialsComponent,
    SendPasswordComponentEmpl,
    ResetPasswordComponentEmpl,
    SendPasswordComponentAdmin,
    ResetPasswordComponentAdmin,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
