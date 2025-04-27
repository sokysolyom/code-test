import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

/**
 * This component is used to display when user is loaded with phone
 */
@Component({
  selector: 'summeet-layout-no-mobile',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './layout-no-mobile.component.html',
  styleUrl: './layout-no-mobile.component.scss',
})
export class LayoutNoMobileComponent {}
