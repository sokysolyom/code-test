import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Role } from '@app/shared/enums/role.enum';
import { IAppState } from '@app/state/app.state';
import { roleSelector } from '@app/state/auth/auth.selector';

/**
 * This component is used to display the profile sidenav.
 */
@Component({
  selector: 'summeet-profile-sidenav',
  standalone: true,
  imports: [
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './profile-sidenav.component.html',
  styleUrl: './profile-sidenav.component.scss',
})
export class ProfileSidenavComponent implements OnInit {
  public isHealthcareProfessional: boolean = false;

  private readonly store = inject(Store<IAppState>);

  /**
   * THis method is called when component is loaded
   * @returns {void}
   */
  public ngOnInit(): void {
    this.store
      .select(roleSelector)
      .pipe(
        take(1),
        tap(role => {
          this.isHealthcareProfessional = role === Role.HEALTHCARE_PROFESSIONAL;
        }),
      )
      .subscribe();
  }
}
