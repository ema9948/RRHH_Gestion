import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { SwalAlertCustom } from 'src/utils/sweetAlert/sweetAlert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginAdminComponent {
  forma!: FormGroup;

  constructor(
    private serviceLogin: LoginService,
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.allConstructorFuctions();
  }

  private allConstructorFuctions() {
    this.crearForm();
  }

  public crearForm() {
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
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public login() {
    const { email, password } = this.forma.controls;
    if (!email.value.trim() || !password.value.trim()) {
      email.markAllAsTouched();
      password.markAllAsTouched();
      return console.log('campos vacios');
    }

    const data = {
      email: email.value,
      password: password.value,
    };

    this.serviceLogin.loginAdmin(data).subscribe(
      (res) => {
        const { userId } = res.body;
        if (!res.ok || !userId) {
          return SwalAlertCustom.alert('error', 'Email no registrado');
        }
        return this._router.navigate(['admin', userId, 'inicio']);
      },
      (error: HttpResponse<any>) => {
        return SwalAlertCustom.alert('error', 'Fallo la Aplicacion');
      }
    );
  }

  public verificarInput(nombre: string) {
    return this.forma.get(nombre)?.invalid && this.forma.get(nombre)?.touched;
  }
}
