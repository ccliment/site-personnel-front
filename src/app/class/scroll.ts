import { Injectable } from "@angular/core";
const PAGE_OFFSET = 30;

@Injectable()
export class Scroll {
  /** ****************************** */
  /** ********* VARIABLES ********** */
  /** ****************************** */

  /** Body de la page */
  public body: HTMLBodyElement;
  /** Taille de la navbar + 50px afin de laisser une marge à l'animation des éléments trigger au clic */
  public toolbar_offset: number;
  /** Liste des élements cliquables du menu */
  public elements_targeted: NodeListOf<Element>;
  /** Liste des éléments cible du clic sur les éléments du menu */
  public scroll_elements: NodeListOf<Element>;


  /** ****************************** */
  /** ********** MÉTHODES ********** */
  /** ****************************** */

  public initialize(): void {
    this.body = document.getElementsByTagName('body').item(0);

    this.toolbar_offset = document.getElementById('navbar').offsetHeight + PAGE_OFFSET;
    this.elements_targeted = document.querySelectorAll('[data-target]');
    this.scroll_elements = document.querySelectorAll('.scroll-element');
  }

  /**
   * Déplace le scroll de la page à la position de l'élément cible.
   *
   * @param event
   *    Élément du menu cliqué
   */
  public scrollToElement(event: MouseEvent | string): void {
    let element: HTMLElement;

    if (typeof event === 'string') {
      element = document.getElementById(event);
    } else {
      element = document.getElementById((event.target as HTMLElement).dataset.target);
    }

    const offset = element.offsetTop - this.toolbar_offset;
    this.body.classList.remove('fixed');

    window.scroll({
      top: offset,
      behavior: 'smooth'
    });
  }

}
