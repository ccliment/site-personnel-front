import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AlertStatus } from '../../interfaces/alert-status';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  public async sendContactForm(values): Promise<AlertStatus> {
    return this.http.post<AlertStatus>(`${environment.api}/contacts`, values).toPromise();
  }

}
