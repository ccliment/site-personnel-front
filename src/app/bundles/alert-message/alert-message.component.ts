import { Component } from '@angular/core';
import { AlertService } from './alert-message.service';

/**
 * Bundle "AlertMessageComponent".
 *
 * Affichage de message simple.
 *
 * @author Charles Climent
 */
@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent {

  public constructor(
    public $alert: AlertService
  ) {
  }

}
