import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { ISocialProgramData } from '@app/static/types/general.type';

/**
 * This component is used to display the social program.
 */
@Component({
  selector: 'summeet-social-program',
  standalone: true,
  imports: [TitleOverlayComponent, CommonModule, MatIconModule],
  templateUrl: './social-program.component.html',
  styleUrls: ['./social-program.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SocialProgramComponent {
  public socialProgramData: ISocialProgramData = {
    term: '<span>Spoločenský program sa uskutoční v prvý deň podujatia, t. j. dňa 22.05.2025.</span>',
    time: '<span>Spoločenský program sa koná mimo odborného programu podujatia, a to po večeri. Presný čas bude upresnený v deň podujatia.</span>',
    fee: '<span>Vstup na spoločenský program je spoplatnený. Poplatok za spoločenský program nie je súčasťou registračného poplatku za účasť na podujatí a každý účastník si ho hradí z vlastných prostriedkov. Výška poplatku bude upresnená v deň podujatia.</span>',
    paymentMethod:
      '<span>Poplatok za spoločenský program je možné uhradiť len počas konania podujatia, a to v hotovosti alebo platobnou kartou.</span>',
    capacity:
      '<span>Kapacita miestnosti so spoločenským programom je obmedzená na 100 miest so sedením. Vzhľadom na obmedzenú kapacitu miest so sedením, uhradením poplatku účastníkovi podujatia nevzniká nárok na miesto na sedenie.</span>',
    attendance:
      '<span>Účasť na spoločenskom programe je dobrovoľná. Pre účastníkov podujatia, ktorí nebudú mať záujem zúčastniť sa spoločenského programu, avšak majú záujem o večeru, bude zabezpečená večera bez spoločenského programu.</span>',
    contents:
      '<span>V rámci spoločenského programu sa uskutoční odovzdávanie cien, sprevádzané hudobným interpretom a hudobný program zabezpečený lokálnym DJ.</span>',
    changes:
      '<span>Organizátor podujatia si vyhradzuje právo na zmenu podmienok spoločenského programu bez udania dôvodu a osobitného upozornenia účastníkov podujatia.</span>',
  };
}
