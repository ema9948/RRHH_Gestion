import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { EmpleadoService } from 'src/app/services/admin/empleado-services.service';
import { SwalAlertCustom } from 'src/utils/sweetAlert/sweetAlert';
@Component({
  selector: 'app-editar-credenciales',
  templateUrl: './editar-credenciales.component.html',
})
export class EditarCredencialesComponent {
  private empleado!: any;
  public forma!: FormGroup;
  public loading!: boolean;

  constructor(
    private activeRou: ActivatedRoute,
    private serviceAdmin: AdminService,
    private serviceEditEmp: EmpleadoService,
    private fb: FormBuilder
  ) {
    this.allFuctions();
  }

  public allFuctions() {
    this.loading = false;
    this.getUsuario();
  }

  private createForm(): void {
    const { email } = this.empleado;
    this.forma = this.fb.group({
      email: [
        email,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$"
          ),
        ],
      ],
      password: ['***', [Validators.required, Validators.minLength(4)]],
    });
  }

  private getUsuario() {
    const id = this.idEmpleado();
    this.serviceAdmin.getEmpleado(id).subscribe(
      (res) => {
        if (res.status != 200)
          return SwalAlertCustom.alert('error', 'Fallo  la Aplicación.');
        this.empleado = res.body;
        this.createForm();
        this.loading = true;
      },
      (error) => {
        return SwalAlertCustom.alert('error', 'Fallo  la Aplicación.');
      }
    );
  }

  public guardar() {
    const { email, password } = this.forma.controls;
    const id = this.idEmpleado();

    if ((!email.value.trim() && !password.value.trim()) || password.invalid) {
      email.markAllAsTouched();
      password.markAllAsTouched();
      SwalAlertCustom.alert('error', 'Complete todos los campos');
      return;
    }
    this.serviceEditEmp
      .editarCredentials(id, {
        email: email.value,
        password: password.value,
      })
      .subscribe(
        (res) => {
          if (res.status != 200)
            return SwalAlertCustom.alert('error', 'Operación fallida');
          console.log(res);
          SwalAlertCustom.alert('success', 'Operación Éxitosa');
        },
        (error) => {
          return SwalAlertCustom.alert('error', 'Fallo  la Aplicación.');
        }
      );
  }

  private idEmpleado() {
    let id!: number;
    this.activeRou.parent?.params.subscribe((res) => {
      id = res['id'];
    });
    return id;
  }
}
