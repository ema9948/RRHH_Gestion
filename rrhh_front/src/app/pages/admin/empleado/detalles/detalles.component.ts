import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Root } from 'src/utils/interface/interfaceGeneric';
import { SwalAlertCustom } from 'src/utils/sweetAlert/sweetAlert';
import { EmpleadoService } from 'src/app/services/admin/empleado-services.service';
import Swal from 'sweetalert2';

import { Location } from '@angular/common';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
})
export class DetallesComponent {
  public empleado!: Root;
  public loading!: boolean;

  constructor(
    private serviceAdmin: AdminService,
    private serviceEmpl: EmpleadoService,
    private activeRou: ActivatedRoute,
    private location: Location
  ) {
    this.allfuctions();
  }

  private allfuctions() {
    this.loading = false;
    this.getUsuario();
  }

  public eliminar() {
    Swal.fire({
      title: 'Desea Eliminar el Empleado?',
      text: 'Se borrarán  todos los registro del empleado.!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar Empleado.!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceEmpl
          .eliminarEmpleado(this.idAdmin(), this.empleado.email)
          .subscribe((res) => {
            if (res.status !== 200)
              return SwalAlertCustom.alert('error', 'Proceso Fallido.');
            this.location.back();
            return SwalAlertCustom.alert('success', 'Empleado Exitoso.');
          });
      }
    });
  }

  private getUsuario() {
    const id = this.idEmpleado();
    this.serviceAdmin.getEmpleado(id).subscribe(
      (res) => {
        if (res.status != 200)
          return SwalAlertCustom.alert('error', 'Fallo  la Aplicación.');
        this.empleado = res.body;
        this.loading = true;
      },
      (error) => {
        return SwalAlertCustom.alert('error', 'Fallo  la Aplicación.');
      }
    );
  }

  private idEmpleado(): number {
    let idEmpleado!: number;
    this.activeRou.parent?.params.subscribe((id) => {
      idEmpleado = id['id'];
    });
    return idEmpleado;
  }

  private idAdmin(): number {
    let idAdmin!: number;
    this.activeRou.parent?.parent?.params.subscribe((id) => {
      idAdmin = id['id'];
    });
    return idAdmin;
  }
}
