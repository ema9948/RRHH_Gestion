import { Component } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { isEmpty } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Root } from 'src/utils/interface/interfaceGeneric';
import { SwalAlertCustom } from 'src/utils/sweetAlert/sweetAlert';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public forma!: FormGroup;
  id!: number;
  public listEmpleados = [];
  public listEmpleadosFilter = [];
  public loading!: boolean;

  constructor(
    private admin: AdminService,
    private activated: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.allfuction();
  }

  private allfuction() {
    this.crearForm();
    this.loading = false;
    this.id = Number(this.idAdmin());
    this.allEmpleados();
  }
  private crearForm() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public filterEmpleado() {
    const { nombre, apellido, dni } = this.forma.value;

    if (!dni && !nombre) {
      SwalAlertCustom.alert('error', 'Complete  campo mínimo.');
      return;
    }

    const filter = this.listEmpleados.filter((item: Root) => {
      if (
        (item.usuarioDetalles.nombre.trim().toLowerCase() ==
          nombre.trim().toLowerCase() &&
          item.usuarioDetalles.apellido.trim().toLowerCase() ==
            apellido.trim().toLowerCase()) ||
        item.usuarioDetalles.dni == dni
      ) {
        return item;
      }
      return null;
    });

    this.forma.reset();

    if (filter.length == 0) {
      this.listEmpleadosFilter = this.listEmpleados;
      return SwalAlertCustom.alert('error', 'Sin coincidencias.');
    }

    this.listEmpleadosFilter = filter;

    return;
  }

  private allEmpleados() {
    if (!this.id) return SwalAlertCustom.alert('error', ' Error ID?.');

    this.admin.allEmpleado(this.id).subscribe(
      (res) => {
        if (res.status != 200)
          return SwalAlertCustom.alert('error', 'Fallo  la Aplicación.');
        const { body } = res;

        this.listEmpleados = body;
        this.listEmpleadosFilter = body;
        this.loading = true;
        return res;
      },
      (error) => {
        return SwalAlertCustom.alert('error', 'Fallo  la Aplicación.');
      }
    );
  }

  public validateInput(nombre: string) {
    return this.forma.get(nombre)?.invalid && this.forma.get(nombre)?.touched;
  }

  public idAdmin() {
    let id;
    this.activated.parent?.params.subscribe((res) => {
      id = res['id'];
      return res;
    });
    return id;
  }
}
