import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileSidenavComponent } from '../profile-sidenav/profile-sidenav.component';

/**
 * This component is used to display the profile overview.
 */
@Component({
  selector: 'summeet-profile-overview',
  standalone: true,
  imports: [RouterModule, ProfileSidenavComponent],
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.scss',
})
export class ProfileOverviewComponent {}
