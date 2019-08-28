import { Injectable } from '@angular/core';
import { AlertStatus } from '../../interfaces/alert-status';

enum AlertClass {
  FadeInDown = 'animated fadeInDown',
  FadeOut = 'animated fadeOut'
}

/**
 * Service "AlertService".
 *
 * Affichage de message simple.
 *
 * @author Charles Climent
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  /** ****************************** */
  /** ********* VARIABLES ********** */
  /** ****************************** */

  /** Données contenues dans le message affiché */
  private _data: AlertStatus;

  /** Ouverture/fermeture de l'alert */
  private alert_opened = false;
  /** Animation à jouer sur l'alert */
  private animation_class: string;


  /** ****************************** */
  /** ***** GETTERS / SETTERS ****** */
  /** ****************************** */

  public get data(): AlertStatus {
    return this._data;
  }

  public get alertOpened(): boolean {
    return this.alert_opened;
  }

  public get animationClass(): string {
    return this.animation_class;
  }


  /** ****************************** */
  /** ********** MÉTHODES ********** */
  /** ****************************** */

  /**
   * Affiche une alerte sur le devant de la page.
   *
   * @param data
   *    Données à affichées (depuis l'API)
   */
  public openAlert(data?: AlertStatus): void {
    this.alert_opened = true;
    this.animation_class = AlertClass.FadeInDown;

    this._data = data;

    setTimeout(() => {
      this.animation_class = AlertClass.FadeOut;

      setTimeout(() => {
        this.alert_opened = false;

        delete this._data;
      }, 1000);
    }, 4000);
  }

}
