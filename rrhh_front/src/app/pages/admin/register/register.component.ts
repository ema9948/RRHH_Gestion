import { Component } from '@angular/core';
import { RegisteService } from 'src/app/services/register/registe.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  forma!: FormGroup;

  constructor(private registerSer: RegisteService, private fb: FormBuilder) {
    this.allFuction();
  }

  private allFuction() {
    this.createForm();
  }

  private createForm() {
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

  public registrar() {
    const { email, password } = this.forma.controls;
    if (!email.value.trim() || !password.value.trim()) {
      email.markAllAsTouched();
      password.markAllAsTouched();
      return;
    }
    const data = {
      email: email.value,
      password: password.value,
    };

    this.registerSer.registe(data).subscribe(
      (res: HttpResponse<any>) => {
        if (!res.ok) return;
        console.log('registrado');
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  public verificarInput(nombre: string) {
    return this.forma.get(nombre)?.invalid && this.forma.get(nombre)?.touched;
  }
}
