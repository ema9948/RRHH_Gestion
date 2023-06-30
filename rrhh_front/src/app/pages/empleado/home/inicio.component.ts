import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { Root, UsuarioDetalles } from 'src/utils/interface/interfaceGeneric';
import { SwalAlertCustom } from 'src/utils/sweetAlert/sweetAlert';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  public empleadoDetalles!: UsuarioDetalles;
  public email: string = '';

  constructor(
    private activatedRou: ActivatedRoute,
    private serviceEmpleado: EmpleadoService
  ) {
    this.allFunction();
  }

  private allFunction() {
    this.getEmpleado();
  }

  private getEmpleado() {
    const idEmpleado = this.idEmpleado();
    this.serviceEmpleado.getEmpleado(idEmpleado).subscribe(
      (res: any) => {
        if (res.status != 200)
          return SwalAlertCustom.alert('error', 'Fallo en la Aplicacion');
        if (!res.body)
          return SwalAlertCustom.alert('error', 'Fallo en la Aplicacion');
        const { email, usuarioDetalles } = res.body;
        this.email = email;
        this.empleadoDetalles = usuarioDetalles;
        return;
      },
      (err) => {
        return SwalAlertCustom.alert('error', 'Fallo en la Aplicacion');
      }
    );
  }

  private idEmpleado() {
    let id!: number;
    this.activatedRou.parent?.params.subscribe((res) => {
      id = res['id'];
    });
    return id;
  }
}
