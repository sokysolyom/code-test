import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/**
 * Component for displaying a loading spinner.
 */
@Component({
  selector: 'summeet-loading',
  standalone: true,
  imports: [MatProgressBarModule],
  styleUrls: ['./loading.component.scss'],
  template: `<mat-progress-bar
    class="loading-component"
    mode="indeterminate"></mat-progress-bar>`,
})
export class LoadingComponent {}
