import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IPeopleData } from '@app/static/types/general.type';

/**
 * IntroductionPeopleComponent
 */
@Component({
  selector: 'summeet-introduction-people',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction-people.component.html',
  styleUrl: './introduction-people.component.scss',
})
export class IntroductionPeopleComponent {
  @Input() public people!: IPeopleData[] | undefined;
  @Input() public title!: string;
  @Input() public isIntroduction!: boolean;
}
