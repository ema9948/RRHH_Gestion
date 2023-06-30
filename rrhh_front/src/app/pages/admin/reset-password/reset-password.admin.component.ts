import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/resetPassword/reset-password.service';
import { SwalAlertCustom } from 'src/utils/sweetAlert/sweetAlert';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponentAdmin {
  public forma!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private activatedRou: ActivatedRoute,
    private _reset: ResetPasswordService
  ) {
    this.allConstructorFuctions();
  }

  private allConstructorFuctions() {
    this.crearForm();
  }

  public crearForm() {
    this.forma = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      password2: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  public reset() {
    if (this.forma.invalid) {
      this.forma.get('password')?.markAllAsTouched();
      this.forma.get('password2')?.markAllAsTouched();
      return;
    }
    if (this.forma.value.password !== this.forma.value.password2) {
      this.forma.get('password')?.markAllAsTouched();
      this.forma.get('password2')?.markAllAsTouched();
      return;
    }

    this._reset.resetPassword(this.getToken(), this.forma.value).subscribe(
      (res: any) => {
        if (res.body.code) {
          return SwalAlertCustom.alert('success', 'Operacion Exitosa.');
        }
      },
      (error) => {
        return SwalAlertCustom.alert('error', 'Proceso Fallido.');
      }
    );
  }

  public verificarInput(nombre: string) {
    return this.forma.get(nombre)?.invalid && this.forma.get(nombre)?.touched;
  }

  private getToken(): string {
    let token!: string;
    this.activatedRou.params.subscribe((res) => {
      token = res['token'];
    });
    if (!token) return '';
    return token;
  }
}
