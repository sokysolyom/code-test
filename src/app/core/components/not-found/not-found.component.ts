import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

/**
 * This component is used to display the not found page.
 */
@Component({
  selector: 'summeet-not-found',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  private readonly router = inject(Router);

  /**
   * This method is called when the user navigates to a different path.
   * @param {string} path - The path to navigate to.
   */
  public navigate(path: string): void {
    void this.router.navigate([path]);
  }
}
