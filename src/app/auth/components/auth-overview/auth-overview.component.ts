import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';

/**
 * This component is used to display an overview of the authentication process
 */
@Component({
  selector: 'summeet-auth-overview',
  standalone: true,
  imports: [
    MatCardModule,
    RouterModule,
    MatIconModule,
    MatDividerModule,
    TitleOverlayComponent,
  ],
  templateUrl: './auth-overview.component.html',
  styleUrls: ['./auth-overview.component.scss'],
})
export class AuthOverviewComponent {}
