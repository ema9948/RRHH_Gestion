import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-empleado',
  templateUrl: './navbar-empleado.component.html',
  styleUrls: ['./navbar-empleado.component.css'],
})
export class NavbarEmpleadoComponent {
  constructor(private route: Router) {}

  public salir() {
    this.route.navigate(['/login']);
  }
}
