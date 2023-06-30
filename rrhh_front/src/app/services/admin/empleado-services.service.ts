import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import {
  Credentials,
  Recibo,
  Root,
  UsuarioDetalles,
} from 'src/utils/interface/interfaceGeneric';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public eliminarEmpleado(idAdmin: number, email: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    });

    return this.http.delete<any>(`${this.apiUrl}admin/usuario/${idAdmin}`, {
      body: { email },
      headers: headers,
      observe: 'response',
    });
  }
  public editarCredentials(id: number, data: Credentials) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    });
    return this.http.patch<any>(
      `${this.apiUrl}admin/usuarioUpdate/${id}`,
      data,
      { headers: httpHeaders, observe: 'response' }
    );
  }

  public editarDetalles(id: number, data: UsuarioDetalles): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    });
    return this.http.patch<any>(
      `${this.apiUrl}admin/detallesUpdate/${id}`,
      data,
      {
        headers: httpHeaders,
        observe: 'response',
      }
    );
  }

  public agregarRecibo(id: number, file: File): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: this.getToken(),
    });

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}admin/recibo/${id}`, formData, {
      headers: httpHeaders,
      observe: 'response',
    });
  }

  public eliminarRecivo(id: number, uuid: string) {
    const httpHeaders = new HttpHeaders({
      Authorization: this.getToken(),
    });

    return this.http.delete<any>(`${this.apiUrl}admin/recibo/${id}`, {
      body: { uuid },
      observe: 'body',
      headers: httpHeaders,
    });
  }

  public getToken(): string {
    const token = JSON.parse(sessionStorage.getItem('token')!);
    if (!token) return '';
    return token;
  }
}
