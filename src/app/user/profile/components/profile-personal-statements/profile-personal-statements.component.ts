import { Component } from '@angular/core';
import { ProfilePersonalFormComponent } from '../profile-personal-form/profile-personal-form.component';

/**
 * This component is used to display the profile personal statements.
 */
@Component({
  selector: 'summeet-profile-personal-statements',
  standalone: true,
  imports: [ProfilePersonalFormComponent],
  templateUrl: './profile-personal-statements.component.html',
  styleUrl: './profile-personal-statements.component.scss',
})
export class ProfilePersonalStatementsComponent {}
