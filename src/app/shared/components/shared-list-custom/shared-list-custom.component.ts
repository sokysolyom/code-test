import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * This component is used to display the shared list custom.
 */
@Component({
  selector: 'summeet-shared-list-custom',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './shared-list-custom.component.html',
  styleUrls: ['./shared-list-custom.component.scss'],
})
export class SharedListCustomComponent {
  @Input() public data!: { text?: string; table?: string }[] | undefined;
}
