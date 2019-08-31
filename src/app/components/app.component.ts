import { Component } from '@angular/core';
import * as Konami from 'konami/konami';
import * as MobileDetect from 'mobile-detect';

/**
 * Component "AppComponent".
 *
 * Affichage et gestion de la page unique du front-office.
 *
 * @author Charles Climent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** ****************************** */
  /** ****** MÉTHODES ANGULAR ****** */
  /** ****************************** */

  constructor() {
    const md = new MobileDetect(navigator.userAgent);

    if (!(md.mobile() || md.tablet())) {
      new Konami(() => {
        this._triggerKonami()
      });
    }
  }


  /** ****************************** */
  /** ********** MÉTHODES ********** */
  /** ****************************** */

  /**
   * Trigger une animation lorsque le Konami Code est effectué.
   *
   * @private
   */
  private _triggerKonami(): void {
    const egg = document.getElementById('konami');

    egg.style.display = 'initial';

    setTimeout(() => {
      egg.classList.add('move1');
    }, 50);

    setTimeout(() => {
      egg.classList.remove('move1');
      egg.classList.add('move2');
    }, 4300);

    setTimeout(() => {
      egg.classList.remove('move2');
      egg.style.display = 'none';
    }, 7300);
  }

}
