import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Role } from '@app/shared/enums/role.enum';
import { IAppState } from '@app/state/app.state';
import { roleSelector } from '@app/state/auth/auth.selector';
import { ProfileWorkplaceFormComponent } from '../profile-workplace-form/profile-workplace-form.component';
import { ProfileRepresentativeStatementsComponent } from '../profile-representative-statements/profile-representative-statements.component';

/**
 * This component is used to display the profile workplace statements.
 */
@Component({
  selector: 'summeet-profile-workplace-statements',
  standalone: true,
  imports: [
    ProfileWorkplaceFormComponent,
    ProfileRepresentativeStatementsComponent,
    CommonModule,
  ],
  templateUrl: './profile-workplace-statements.component.html',
  styleUrl: './profile-workplace-statements.component.scss',
})
export class ProfileWorkplaceStatementsComponent implements OnInit {
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
