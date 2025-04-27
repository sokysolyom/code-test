import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 *
 */
@Component({
  selector: 'summeet-introduction-list-custom',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './introduction-list-custom.component.html',
  styleUrls: ['./introduction-list-custom.component.scss'],
})
export class IntroductionListCustomComponent {
  @Input() public data!: string[] | undefined;
}
