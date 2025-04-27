import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { updateSidenavVisibility } from '@app/state/event/event.action';
import { sidenavVisibilitySelector } from '@app/state/event/event.selector';

/**
 *
 */
@Component({
  selector: 'summeet-mobile-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
})
export class MobileNavbarComponent implements OnInit {
  public currentSidenavState: boolean = false;
  private readonly store = inject(Store);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.store
      .select(sidenavVisibilitySelector)
      .pipe(
        tap((data: boolean) => {
          this.currentSidenavState = data;
        }),
      )
      .subscribe();
  }

  /**
   * This method is called when the sidenav is toggled.
   * @returns {void}
   */
  public toggleSidenav(): void {
    this.currentSidenavState = !this.currentSidenavState;
    this.store.dispatch(
      updateSidenavVisibility({ content: this.currentSidenavState }),
    );
  }
}
