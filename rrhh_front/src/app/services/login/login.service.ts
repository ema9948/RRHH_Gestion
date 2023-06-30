import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { SwalAlertCustom } from 'src/utils/sweetAlert/sweetAlert';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public loginAdmin(data: data) {
    return this._http
      .post<any>(`${this.apiUrl}auth/authenticate/admin`, data, {
        observe: 'response',
      })
      .pipe(
        map((item: any) => {
          if (item.status == 204) {
            return SwalAlertCustom.alert('error', 'Email no registrado.');
          }
          const { body } = item;
          const token = body?.jwt;
          sessionStorage.setItem('token', JSON.stringify(token));
          return item;
        })
      );
  }

  public loginEmpleado(data: data) {
    return this._http
      .post<any>(`${this.apiUrl}auth/authenticate/user`, data, {
        observe: 'response',
      })
      .pipe(
        map((item: HttpResponse<any>) => {
          const { body } = item;
          const token = body?.jwt;
          sessionStorage.setItem('token', JSON.stringify(token));
          return item;
        })
      );
  }
}

interface data {
  email: string;
  password: string;
}
