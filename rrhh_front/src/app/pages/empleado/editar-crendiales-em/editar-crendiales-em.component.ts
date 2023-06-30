import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { Credentials } from 'src/utils/interface/interfaceGeneric';
import { SwalAlertCustom } from 'src/utils/sweetAlert/sweetAlert';

@Component({
  selector: 'app-editar-crendiales-em',
  templateUrl: './editar-crendiales-em.component.html',
  styleUrls: ['./editar-crendiales-em.component.css'],
})
export class EditarCrendialesEmComponent {
  public forma!: FormGroup;
  public empleado!: Credentials;

  constructor(
    private serviceEmpleado: EmpleadoService,
    private activatedRou: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.allFunctions();
  }

  private allFunctions() {
    this.getEmpleado();
  }

  private crearForm() {
    this.forma = this.fb.group({
      email: [
        this.empleado.email,
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$"
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  public guardar() {
    const { email, password } = this.forma.value;
    if (!email.trim() || !password.trim()) {
      this.forma.get('email')?.markAllAsTouched();
      this.forma.get('password')?.markAllAsTouched();
      return;
    }

    this.serviceEmpleado
      .editarCredentials(this.idEmpleado(), this.forma.value)
      .subscribe((res) => {
        console.log(res);
        if (res.status != 200)
          return SwalAlertCustom.alert('error', 'Proceso Fallido.');
        const token = `Bearer ${res.body.message}`;
        sessionStorage.setItem('token', token);
        return SwalAlertCustom.alert('success', 'Proceso Exitoso.');
      });
  }

  private getEmpleado() {
    const id = this.idEmpleado();
    this.serviceEmpleado.getEmpleado(id).subscribe((res: HttpResponse<any>) => {
      if (res.status != 200)
        return SwalAlertCustom.alert('error', 'Proceso Fallido');
      this.empleado = res.body;
      this.crearForm();
      return;
    });
  }

  private idEmpleado() {
    let id!: number;
    this.activatedRou.parent?.params.subscribe((res) => {
      id = res['id'];
    });
    return id;
  }

  public validarInput(nombre: string) {
    return this.forma.get(nombre)?.invalid && this.forma.get(nombre)?.touched;
  }
}
