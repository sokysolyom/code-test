import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * This component is used to display the title overlay.
 */
@Component({
  selector: 'summeet-title-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title-overlay.component.html',
  styleUrls: ['./title-overlay.component.scss'],
})
export class TitleOverlayComponent {
  @Input() public title!: string;
}
