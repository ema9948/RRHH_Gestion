import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Credentials } from 'src/utils/interface/interfaceGeneric';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public allEmpleado(id: number) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    });

    return this._http.get<any>(`${this.apiUrl}admin/allUsuario/${id}`, {
      headers: httpHeaders,
      observe: 'response',
    });
  }

  public getEmpleado(id: number) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    });

    return this._http.get<any>(`${this.apiUrl}admin/usuario/${id}`, {
      headers: httpHeaders,
      observe: 'response',
    });
  }

  public addEmpleadp(id: number, data: any) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    });

    return this._http.post<any>(`${this.apiUrl}admin/addUsuario/${id}`, data, {
      headers: httpHeaders,
      observe: 'response',
    });
  }

  credentialChange(value: Credentials, id: number) {
    const httpHeaderscon = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    });
    return this._http
      .patch(`${this.apiUrl}admin/setCredential/${id}`, value, {
        headers: httpHeaderscon,
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

  public getToken(): string {
    const token = JSON.parse(sessionStorage.getItem('token')!);
    if (!token) return '';
    return token;
  }
}
