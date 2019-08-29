import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  /**
   * Envoie le formulaire de contact à l'API.
   *
   * @param values
   *    Données à envoyer
   */
  public async sendContactForm(values): Promise<object> {
    return this.http.post(`${environment.api}/contacts`, values).toPromise();
  }

}
