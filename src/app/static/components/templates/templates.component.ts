import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ITemplatesData } from '@app/static/types/general.type';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';

/**
 * This component is used to display the templates.
 */
@Component({
  selector: 'summeet-templates',
  standalone: true,
  imports: [MatIconModule, CommonModule, TitleOverlayComponent],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent {
  public templatesData: ITemplatesData = {
    presentationText:
      'Na prípravu prezentácie odporúčame použiť šablónu dostupnú na stiahnutie nižšie.',
    posterText:
      'Na prípravu posteru odporúčame použiť šablónu dostupnú na stiahnutie nižšie.',
  };

  /**
   * This method is used to download the poster template.
   * @returns {void}
   */
  public presentation(): void {
    window.open('assets/presentations/presentation.potx', '_blank');
  }
}
