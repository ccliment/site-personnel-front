import { Component, HostListener, OnInit } from '@angular/core';
import { Scroll } from '../../class/scroll';

/**
 * Component "NavbarComponent".
 *
 * Gestion de la barre de navigation affichée sur la page unique du front-office.
 *
 * @author Charles Climent
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  /** ****************************** */
  /** ********* VARIABLES ********** */
  /** ****************************** */

  /** Définit l'ouverture/fermeture du menu pour mobile */
  public open_mobile_menu?: boolean = null;
  /** Définit les classes à mettre sur le menu */
  public navbar_classes: string = 'mat-toolbar-row';


  /** ****************************** */
  /** ****** MÉTHODES ANGULAR ****** */
  /** ****************************** */

  public constructor(public scroll: Scroll) {
  }

  public ngOnInit() {
    this.scroll.initialize();

    this.onPageScroll();
  }


  /** ****************************** */
  /** ********* LISTENERS ********** */
  /** ****************************** */

  /**
   * Réinitialise l'état du menu, ainsi que les classes assignées.
   *
   * @private
   */
  private _resetNavbarClasses(): void {
    this.open_mobile_menu = null;
    this.navbar_classes = 'mat-toolbar-row';
  }

  /**
   * Au scroll, détermine quels sont les éléments cible visibles.
   *
   * Le premier élément cible visible sur la page aura son correspondant sur le menu mis en évidence avec la classe "active".
   */
  @HostListener('window:scroll')
  public onPageScroll(): void {
    const elementsVisibles: Element[] = [];

    this.scroll.scroll_elements.forEach(scroll => {
      const rect = scroll.getBoundingClientRect();
      const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

      if ((rect.top <= windowHeight) && ((rect.top + rect.height) >= 0)) {
        elementsVisibles.push(scroll);
      }
    });

    if (elementsVisibles.length > 0) {
      const target = elementsVisibles[0] as HTMLElement;

      this.scroll.elements_targeted.forEach((element: HTMLElement) => {
        if (element.dataset.target === target.id) {
          element.classList.add('active');
        } else {
          element.classList.remove('active');
        }
      });

      const navbar = document.getElementById('navbar');
      const toolbar_action = document.getElementById('toolbar-action');

      if (this.scroll.elements_targeted.item(0).classList.contains('active')) {
        navbar.classList.add('night');
        toolbar_action.classList.add('night');
      } else {
        navbar.classList.remove('night');
        toolbar_action.classList.remove('night');
      }

      this._resetNavbarClasses();
    }
  }

  /**
   * Modifie l'état et les classes du menu
   */
  public toggleMenuState(): void {
    if (this.open_mobile_menu) {
      this.open_mobile_menu = false;
      this.navbar_classes = 'mat-toolbar-row visible animated faster fadeOut';

      setTimeout(() => {
        this._resetNavbarClasses();
      }, 500);
    } else {
      this.open_mobile_menu = true;
      this.navbar_classes = 'mat-toolbar-row visible animated faster fadeIn';
    }
  }

}
