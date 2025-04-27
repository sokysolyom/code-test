import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Observable, of, tap, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { LoadingService } from '@app/core/services/loading.service';
import { Disposable } from './core/utils/disposable';
import { WINDOW_REF } from './core/utils/window-ref';
import { IAppState } from './state/app.state';
import { IUserState } from './state/auth/auth.reducer';
import { postAuthCredentials } from './state/auth/auth.action';
import { sidenavVisibilitySelector } from './state/event/event.selector';
import { updateNavbarVisibility } from './state/event/event.action';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { IconLoaderService } from './core/utils/icon-loader.service';
import { authSelector } from './state/auth/auth.selector';
import { eventEditSelect } from './state/event-edit/event-edit.selector';
import { postEventEditData } from './state/event-edit/event-edit.actions';
import { IEventEdiState } from './state/event-edit/event-edit.reducer';
import { registerSelector } from './state/register/register.selector';
import { postRegisterRole } from './state/register/register.actions';
import { IRegisterState } from './state/register/register.reducer';
import { partnersSelector } from './state/partners/partners.selector';
import { postPartnersData } from './state/partners/partners.action';

/**
 *
 */
@Component({
  selector: 'summeet-root',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    CommonModule,
    MatSidenavModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends Disposable implements OnInit, AfterViewInit {
  public title = 'Mladí hematológovia';
  public sidenavOpened$: Observable<boolean> | undefined;
  public isMobile = false;
  @ViewChild('appContent') public appContent!: ElementRef<HTMLDivElement>;
  @ViewChild('sidenav', { static: true }) public sidenav!: ElementRef;

  private readonly store = inject(Store<IAppState>);
  private readonly router = inject(Router);
  private readonly loadingService = inject(LoadingService);
  private readonly window = inject(WINDOW_REF);
  private readonly iconLoaderService = inject(IconLoaderService);

  /**
   * This method is used to listen to the window resize event
   * @param {object} event - The event object
   * @param {object} event.target - The target object
   * @param {number} event.target.innerWidth - The inner width of the target
   * @returns {void}
   */
  @HostListener('window:resize', ['$event'])
  public onResize(event: { target: { innerWidth: number } }): void {
    if (event.target.innerWidth > 959) {
      this.isMobile = false;
      this.store.dispatch(updateNavbarVisibility({ content: true }));
    } else {
      this.isMobile = true;
      this.store.dispatch(updateNavbarVisibility({ content: false }));
    }
  }

  /**
   * Beforeunload handler
   * @description Save auth state to local storage before unloading the window
   * @returns {void}
   */
  @HostListener('window:beforeunload', ['$event'])
  public beforeunloadHandler(): void {
    this.store.select(authSelector).subscribe(auth => {
      localStorage.setItem('authState', JSON.stringify(auth));
    });
    this.store.select(eventEditSelect).subscribe(eventEdit => {
      localStorage.setItem('eventEditState', JSON.stringify(eventEdit));
    });
    this.store.select(registerSelector).subscribe(register => {
      localStorage.setItem('registerState', JSON.stringify(register));
    });
    this.store.select(partnersSelector).subscribe(partners => {
      localStorage.setItem('partners', JSON.stringify(partners));
    });
  }

  /**
   * This method is called when the component is initialized
   * @returns {void}
   */
  public ngOnInit(): void {
    this.iconLoaderService.loadIcons();
    if (
      localStorage.getItem('authState') !== null &&
      localStorage.getItem('authState') !== 'undefined' &&
      'authState' in localStorage
    ) {
      const application: IUserState = JSON.parse(
        localStorage.getItem('authState') ?? '',
      );
      this.store.dispatch(
        postAuthCredentials({
          content: {
            accessToken: application.accessToken,
            refreshToken: application.refreshToken,
            id: application.id,
            role: application.role,
            email: application.email,
          },
        }),
      );
    }
    if (
      localStorage.getItem('eventEditState') !== null &&
      localStorage.getItem('eventEditState') !== 'undefined' &&
      'eventEditState' in localStorage
    ) {
      const eventEdit: IEventEdiState = JSON.parse(
        localStorage.getItem('eventEditState') ?? '',
      );
      this.store.dispatch(
        postEventEditData({
          content: {
            id: eventEdit.id,
            name: eventEdit.name,
          },
        }),
      );
    }
    if (
      localStorage.getItem('registerState') !== null &&
      localStorage.getItem('registerState') !== 'undefined' &&
      'registerState' in localStorage
    ) {
      const eventEdit: IRegisterState = JSON.parse(
        localStorage.getItem('registerState') ?? '',
      );
      this.store.dispatch(
        postRegisterRole({
          content: {
            role: eventEdit.role,
          },
        }),
      );
    }
    if (
      localStorage.getItem('partners') !== null &&
      localStorage.getItem('partners') !== 'undefined' &&
      'partners' in localStorage
    ) {
      const partners = JSON.parse(localStorage.getItem('partners') ?? '');
      this.store.dispatch(
        postPartnersData({
          content: {
            partners: partners,
          },
        }),
      );
    }
    this.store.select(sidenavVisibilitySelector).subscribe(event => {
      this.sidenavOpened$ = of(event);
    });

    localStorage.clear();

    this.loadingService.loadingStatus$
      .pipe(
        tap(status => {
          // eslint-disable-next-line sonarjs/no-selector-parameter
          if (status) {
            this.loadingService.onShowLoading();
          } else {
            this.loadingService.onHideLoading();
          }
        }),
        takeUntil(this.destroySignal$),
      )
      .subscribe();

    this.onResize({ target: { innerWidth: this.window.innerWidth } });
  }

  /**
   * This method is used to scroll to top when the route changes
   * @returns {void}
   */
  public ngAfterViewInit(): void {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        if (document.querySelectorAll('.mat-drawer-content').length > 0) {
          document.querySelectorAll('.mat-drawer-content')[0].scrollTo(0, 0);
        }
        this.appContent.nativeElement.scrollTo(0, 0);
      }
    });
  }
}
