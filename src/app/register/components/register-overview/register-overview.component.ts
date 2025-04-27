import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { IAppState } from '@app/state/app.state';
import { postRegisterRole } from '@app/state/register/register.actions';
import { Role } from '@app/shared/enums/role.enum';

/**
 * Register overview component
 */
@Component({
  selector: 'summeet-register-overview',
  standalone: true,
  imports: [
    MatCardModule,
    TitleOverlayComponent,
    MatIconModule,
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './register-overview.component.html',
  styleUrls: ['./register-overview.component.scss'],
})
export class RegisterOverviewComponent {
  private readonly store = inject(Store<IAppState>);

  /**
   * Set the register state
   * @returns {void}
   */
  public setRegisterStatePartner(): void {
    this.store.dispatch(
      postRegisterRole({
        content: {
          role: Role.PARTNER,
        },
      }),
    );
  }

  /**
   * Set the register state
   * @returns {void}
   */
  public setRegisterStateSubject(): void {
    this.store.dispatch(
      postRegisterRole({
        content: {
          role: Role.SUBJECT,
        },
      }),
    );
  }
}
