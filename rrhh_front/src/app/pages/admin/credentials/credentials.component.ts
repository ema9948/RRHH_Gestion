import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Credentials } from 'src/utils/interface/interfaceGeneric';
import { SwalAlertCustom } from 'src/utils/sweetAlert/sweetAlert';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css'],
})
export class CredentialsComponent {
  public forma!: FormGroup;
  public admin!: Credentials;

  constructor(
    private serviceAdmin: AdminService,
    private activatedRou: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.allFunctions();
  }

  private allFunctions() {
    this.getAdmin();
    this.crearForm();
  }

  private crearForm() {
    this.forma = this.fb.group({
      email: [
        '',
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
    if (this.forma.invalid) {
      this.forma.get('password')?.invalid &&
        this.forma.get('password')?.markAllAsTouched();
      this.forma.get('email')?.invalid &&
        this.forma.get('email')?.markAllAsTouched();
      return;
    }
    const { email, password } = this.forma.value;
    if (!email.trim() || !password.trim()) {
      this.forma.get('email')?.markAllAsTouched();
      this.forma.get('password')?.markAllAsTouched();
      return;
    }
    this.serviceAdmin
      .credentialChange(this.forma.value, this.idAdmin())
      .subscribe((res) => {
        if (res.status != 200)
          return SwalAlertCustom.alert('error', 'Preoceso Fallido');
        return SwalAlertCustom.alert('success', 'Proceso Exitoso.');
      });

    this.forma.reset();
    return;
  }

  public idAdmin(): any {
    let id;
    this.activatedRou.parent?.params.subscribe((res) => {
      id = res['id'];
      return res;
    });
    if (!id) return null;
    return id;
  }
  private getAdmin() {
    this.serviceAdmin.allEmpleado(this.idAdmin()).subscribe((res) => {
      console.log(res);
    });
  }
  public validarInput(nombre: string) {
    return this.forma.get(nombre)?.invalid && this.forma.get(nombre)?.touched;
  }
}
