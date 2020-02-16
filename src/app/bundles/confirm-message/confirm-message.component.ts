import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Bundle "ConfirmMessageComponent".
 *
 * Affichage d'un message de confirmation, avec OUI/NON comme solution.
 *
 * @author Charles Climent
 */
@Component({
  selector: 'app-confirm-message',
  templateUrl: './confirm-message.component.html',
  styles: [`
      .message {
          white-space: pre-line;
      }
  `]
})
export class ConfirmMessageComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data?: {
      title?: string;
      message?: string;
      action?: string;
    }
  ) {
  }

}
