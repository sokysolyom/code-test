import { Component, Input } from '@angular/core';

/**
 * This component is used to display the title overlay long.
 */
@Component({
  selector: 'summeet-title-overlay-long',
  templateUrl: './title-overlay-long.component.html',
  styleUrls: ['./title-overlay-long.component.scss'],
})
export class TitleOverlayLongComponent {
  @Input() public title!: string;
}
