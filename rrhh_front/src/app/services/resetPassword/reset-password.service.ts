import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Credentials } from 'src/utils/interface/interfaceGeneric';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public sendEmailReset(data: Credentials) {
    return this.http.post(`${this.apiUrl}auth/resetPasswordSendEmail`, data, {
      observe: 'response',
    });
  }

  public resetPassword(token: string, data: Credentials) {
    return this.http.patch(
      `${this.apiUrl}auth/resetPassword/?token=${token}`,
      data,
      {
        observe: 'response',
      }
    );
  }
}
