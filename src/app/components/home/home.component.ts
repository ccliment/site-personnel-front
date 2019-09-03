import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { NgwWowService } from 'ngx-wow';
import * as Parallax from 'parallax-js';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../bundles/alert-message/alert-message.service';
import { RequestService } from '../../services/request/request.service';
import { Scroll } from '../../class/scroll';

/**
 * Component "HomeComponent".
 *
 * Affichage et gestion de la page unique du front-office.
 *
 * @author Charles Climent
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [Scroll]
})
export class HomeComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild('scene', {static: true}) private scene: ElementRef;
  @ViewChildren('expDesc') private expDesc: QueryList<TemplateRef<any>>;

  /** ****************************** */
  /** ********* VARIABLES ********** */
  /** ****************************** */

  /** Désabonnement du subscriber Routing lors de la fermeture du component */
  private routeSubscriber: Subscription;
  /** Désabonnement des subscribers */
  private unsubscribe: Subject<void> = new Subject();

  /** Mon âge, issu du calcul de ma date de naissance et de la date du jour */
  public age: number;
  /** Formulaire de contact */
  public contact_form: FormGroup;
  /** État du bouton de soumission du formulaire */
  public submitInProgress: boolean = false;


  /** ****************************** */
  /** ***** GETTERS / SETTERS ****** */
  /** ****************************** */

  public get accessibility(): boolean {
    return this.scroll.body.classList.contains('accessibility');
  }


  /** ****************************** */
  /** ****** MÉTHODES ANGULAR ****** */
  /** ****************************** */

  public constructor(
    private _router: Router,
    private $wow: NgwWowService,
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private $alert: AlertService,
    private $request: RequestService,
    public scroll: Scroll
  ) {
    this.routeSubscriber = this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.$wow.init();
      }
    });
  }

  public ngOnInit() {
    const birthday = new Date(1994, 0, 24);
    const today = new Date();

    const diff = new Date(today.getTime() - birthday.getTime());
    this.age = diff.getFullYear() - 1970;

    this.contact_form = this._fb.group({
      name: this._fb.control('', [
        Validators.required
      ]),
      email: this._fb.control('', [
        Validators.email,
        Validators.required
      ]),
      subject: this._fb.control('', [
        Validators.maxLength(150)
      ]),
      message: this._fb.control('', [
        Validators.required,
        Validators.maxLength(5000)
      ])
    })
  }

  public ngOnDestroy() {
    this.unsubscribe.unsubscribe();

    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public ngAfterContentInit() {
    const scene = this.scene.nativeElement as HTMLDivElement;

    const parallax_instance = new Parallax(scene, {
      relativeInput: true,
      hoverOnly: true
    });
  }


  /** ****************************** */
  /** ********** MÉTHODES ********** */
  /** ****************************** */

  /**
   * Modifie la couleur des étoiles dans le fond par ajout/suppression de classes.
   *
   * @param event
   *    Événement mouseover/out
   * @param source
   *    Classe à ajouter/supprimer
   */
  public onHoverLogo(event: MouseEvent, source: string): void {
    if (event.type === 'mouseover') {
      (this.scene.nativeElement as HTMLDivElement).classList.add(source);
    } else {
      (this.scene.nativeElement as HTMLDivElement).classList.remove(source);
    }
  }

  /**
   * Retourne un tableau de "n" élément(s).
   *
   * @param n
   *    Taille du tableau
   */
  public arrayThree(n: number): number[] {
    return [...Array(n).keys()];
  }

  /**
   * Ouvre un dialog
   *
   * @param index
   *    Position du sialog à ouvrir
   */
  public openDialog(index: number): void {
    this._dialog.open(this.expDesc.toArray()[index]);
  }

  /**
   * Indication si la valeur contenue dans le champ ciblé est invalide.
   *
   * @param field
   *    Champ ciblé
   */
  public fieldIsInvalid(field: string): boolean {
    return this.contact_form.get(field).invalid;
  }

  /**
   * Retourne le message d'erreur du champ ciblé.
   *
   * @param field
   *    Champ ciblé
   */
  public getFieldErrorMessage(field: string): string | null {
    const target = this.contact_form.get(field);

    if (target.invalid) {
      switch (field) {
        case 'email':
          if (target.hasError('email')) {
            return 'Le format de l\'adresse email est invalide';
          }

          return 'L\'email est requis';
        case 'subject':
          if (target.hasError('maxlength')) {
            return 'La longueur du sujet est trop grande'
          }

        break;
        case 'message':
          if (target.hasError('maxlength')) {
            return 'La longueur du message est trop grande';
          }

          return 'Le contenu du message est requis';
      }
    }

    return null;
  }

  /**
   * Soumission du formulaire.
   *
   * @param event
   *    Événement de validation.
   *
   * @remarks L'événement est nécessaire pour réinitialiser la validation sur les champs du formulaire.
   */
  public async onSubmit(event: Event) {
    if (this.submitInProgress) {
      return;
    }

    this.submitInProgress = true;

    try {
      await this.$request.sendContactForm(this.contact_form.value);

      (event.target as HTMLFormElement).reset();
      this.contact_form.reset();

      this.$alert.openAlert({
        success: true,
        message: 'Votre message a correctement été transmis, merci !'
      });
    } catch (e) {
      this.$alert.openAlert({
        success: false,
        message: 'Une erreur s\'est produite lors de la communication avec l\'API :('
      });
    }

    this.submitInProgress = false;
  }

  /**
   * Modifie les couleurs du sites afin de les rendre compatibles avec les normes en terme d'accéssibilité.
   *
   * @param event
   *    Click sur l'élément modifiant la classe du body
   */
  public toggleAccessibilityState(event: MouseEvent): void {
    event.preventDefault();

    this.scroll.body.classList.toggle('accessibility');
  }

}
