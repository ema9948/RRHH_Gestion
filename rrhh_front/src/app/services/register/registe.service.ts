import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RegisteService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public registe(data: any) {
    return this.http.post(`${this.apiUrl}auth/register`, data, {
      observe: 'response',
    });
  }
}
