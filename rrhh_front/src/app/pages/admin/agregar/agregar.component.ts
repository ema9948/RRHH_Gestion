import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { SwalAlertCustom } from 'src/utils/sweetAlert/sweetAlert';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent {
  public forma!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviceAdmi: AdminService,
    private activaRou: ActivatedRoute
  ) {
    this.allFunctions();
  }

  private allFunctions() {
    this.crearForm();
  }

  private crearForm() {
    this.forma = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$"
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      telefono: ['', [Validators.required, Validators.minLength(8)]],
      fechanacimiento: ['', [Validators.required]],
      ingreso: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      domicilio: ['', [Validators.required, Validators.minLength(2)]],
      legajo: ['', [Validators.required, Validators.minLength(2)]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      obrasocial: ['', [Validators.required, Validators.minLength(2)]],
      puesto: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  public guardar() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).map((control) => {
        control.markAllAsTouched();
        return SwalAlertCustom.alert('error', 'Campo Requerido.');
      });
      return;
    }

    this.serviceAdmi.addEmpleadp(this.idAdmin(), this.forma.value).subscribe(
      (res) => {
        if (res.status != 201)
          return SwalAlertCustom.alert('error', 'Proceso Fallido.');
        return SwalAlertCustom.alert('success', 'Proceso Exitoso.');
      },
      (err) => {
        console.log(err);
        return SwalAlertCustom.alert('error', err?.error?.message);
      }
    );

    this.forma.reset();
    return;
  }

  public verificarInput(nombre: string) {
    return this.forma.get(nombre)?.invalid && this.forma.get(nombre)?.touched;
  }

  private idAdmin() {
    let id!: number;
    this.activaRou.parent?.params.subscribe((res) => {
      id = res['id'];
    });
    return id;
  }
}
