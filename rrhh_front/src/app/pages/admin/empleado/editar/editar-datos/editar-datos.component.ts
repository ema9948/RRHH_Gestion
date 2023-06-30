import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalAlertCustom } from 'src/utils/sweetAlert/sweetAlert';
import { UsuarioDetalles } from 'src/utils/interface/interfaceGeneric';
import { EmpleadoService } from 'src/app/services/admin/empleado-services.service';
@Component({
  selector: 'app-editar-datos',
  templateUrl: './editar-datos.component.html',
})
export class EditarDatosComponent {
  public forma!: FormGroup;
  public empleado!: any;
  constructor(
    private activateRou: ActivatedRoute,
    private serviceAdmin: AdminService,
    private serviceEmple: EmpleadoService,
    private fb: FormBuilder
  ) {
    this.allfunctions();
  }

  private allfunctions() {
    this.getUsuario();
  }

  private createForm() {
    const { usuarioDetalles: user } = this.empleado;
    this.forma = this.fb.group({
      apellido: [user.apellido, Validators.required],
      telefono: [user.telefono, Validators.required],
      dni: [user.dni, Validators.required],
      domicilio: [user.domicilio, Validators.required],
      fechanacimiento: [user.fechanacimiento, Validators.required],
      ingreso: [user.ingreso, Validators.required],
      legajo: [user.legajo, Validators.required],
      nombre: [user.nombre, Validators.required],
      obrasocial: [user.obrasocial, Validators.required],
      puesto: [user.puesto, Validators.required],
    });
  }

  public guardar() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((controls) => {
        if (controls.value == null || !controls.value.trim()) {
          SwalAlertCustom.alert('error', 'Complete todos los Campos');
          controls.markAllAsTouched();
        }
      });
      return;
    }
    this.serviceEmple
      .editarDetalles(this.empleado.id, this.forma.value)
      .subscribe(
        (res) => {
          if (res.status != 200)
            return SwalAlertCustom.alert('error', 'Proceso fallido');

          return SwalAlertCustom.alert('success', 'Proceso Exitoso');
        },
        (err) => {
          return SwalAlertCustom.alert('error', err.error.message);
        }
      );
  }

  private getUsuario() {
    const id = this.idEmpleado();

    this.serviceAdmin.getEmpleado(id).subscribe(
      (res) => {
        if (res.status != 200)
          return SwalAlertCustom.alert('error', 'Fallo  la Aplicación.');
        this.empleado = res.body;
        this.createForm();
      },
      (error) => {
        return SwalAlertCustom.alert('error', 'Fallo  la Aplicación.');
      }
    );
  }

  private idEmpleado() {
    let id!: number;
    this.activateRou.parent?.params.subscribe((res) => {
      id = res['id'];
    });
    return id;
  }

  public validateInput(nombre: string) {
    return this.forma.get(nombre)?.invalid && this.forma.get(nombre)?.touched;
  }
}
