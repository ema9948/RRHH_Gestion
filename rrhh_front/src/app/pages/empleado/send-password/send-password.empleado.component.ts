import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/resetPassword/reset-password.service';
import { SwalAlertCustom } from 'src/utils/sweetAlert/sweetAlert';

@Component({
  selector: 'app-reset-password',
  templateUrl: './send-password.component.html',
})
export class SendPasswordComponentEmpl {
  public forma!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private reset: ResetPasswordService
  ) {
    this.allConstructorFuctions();
  }

  private allConstructorFuctions() {
    this.crearForm();
  }

  public crearForm() {
    this.forma = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  public send() {
    if (this.forma.invalid) {
      this.forma.get('email')?.markAllAsTouched();
      SwalAlertCustom.alert('error', 'Email Requerido.');
      return;
    }

    this.reset.sendEmailReset(this.forma.value).subscribe(
      (res: any) => {
        if (res.body.code == 200) {
          return SwalAlertCustom.alert('success', 'Verifique su Email');
        }
      },
      (err) => {
        if (err.error.message) {
          return SwalAlertCustom.alert('error', 'Email no registrado.');
        }
      }
    );
  }
  public verificarInput(nombre: string) {
    return this.forma.get(nombre)?.invalid && this.forma.get(nombre)?.touched;
  }
}
