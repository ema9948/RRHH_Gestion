import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Credentials, Root } from 'src/utils/interface/interfaceGeneric';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getEmpleado(id: number) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    });

    return this.http.get<any>(`${this.apiUrl}user/${id}`, {
      headers: httpHeaders,
      observe: 'response',
    });
  }

  public descargarRecibo(fileName: string) {
    const httpHeader = new HttpHeaders({
      Authorization: this.getToken(),
    });

    return this.http.get(`${this.apiUrl}user/loadRecibo/${fileName}`, {
      responseType: 'blob',
      headers: httpHeader,
    });
  }

  public firmarRecibo(empleado: Root, id: number) {
    const httpHeaders = new HttpHeaders({
      Authorization: this.getToken(),
    });

    const email = { email: empleado.email };

    return this.http.patch(`${this.apiUrl}user/firmar/${id}`, email, {
      headers: httpHeaders,
      observe: 'response',
    });
  }

  public editarCredentials(id: number, data: Credentials) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    });
    return this.http.patch<any>(
      `${this.apiUrl}user/setCredential/${id}`,
      data,
      { headers: httpHeaders, observe: 'response' }
    );
  }
  private getToken(): string {
    const token = JSON.parse(sessionStorage.getItem('token')!);
    if (!token) return '';
    return token;
  }
}
