import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedListCustomComponent } from '@app/shared/components/shared-list-custom/shared-list-custom.component';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { IAbstractData } from '@app/static/types/general.type';

/**
 * This component is used to display the abstract page.
 */
@Component({
  selector: 'summeet-abstract',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    TitleOverlayComponent,
    SharedListCustomComponent,
  ],
  templateUrl: './abstract.component.html',
  styleUrls: ['./abstract.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AbstractComponent {
  public abstractData: IAbstractData = {
    registerTerm: `
<table>
<tr>
<th></th>
<th>Začiatok</th>
<th>Koniec</th>
</tr>
<tr>
<td>Registrácia aktívnej účasti</td>
<td>-</td>
<td>31.03.2025</td>
</tr>
<tr>
<td>Odovzdanie abstraktov</td>
<td>-</td>
<td>31.03.2025</td>
</tr>
<tr>
<td>Odovzdanie prezentácie</td>
<td>-</td>
<td>31.03.2025</td>
</tr>
</table>`,
    activityConditions: [
      {
        text: '<span>Registrácia aktívnej účasti podlieha schváleniu organizátora podujatia.</span>',
      },
      {
        text: '<span>Registrácia aktívnej účasti vo forme prednášania bude posudzovaná organizačným výborom až po odovzdaní abstraktu.</span>',
      },
      {
        text: '<span>Záujemca o aktívnu účasť bude emailom informovaný o schválení alebo neschválení registrácie aktívnej účasti.</span>',
      },
      {
        text: '<span>Ak záujemca o aktívnu účasť nebol informovaný o schválení aktívnej účasti do 30 kalendárnych dní odo dňa konca registrácie aktívnej účasti, má sa za to, že jeho registrácia aktívnej účasti nebola schválená.</span>',
      },
      {
        text: '<span>Organizátor podujatia je oprávnený neschváliť registráciu aktívnej účasti bez udania dôvodu.</span>',
      },
      {
        text: '<span>Organizátor podujatia je oprávnený odmietnuť, prípadne vrátiť na prepracovanie, znenie abstraktu, ak nespĺňa formálne a obsahové náležitosti.</span>',
      },
    ],
    forbiddenContent: {
      text: '<span>Abstrakt <b>nesmie</b> obsahovať:</span>',
      list: [
        {
          text: '<span>obchodný názov akéhokoľvek lieku (SPC lieku je povolené),</span>',
        },
        {
          text: '<span>reklamným spôsobom používať názov farmaceutickej spoločnosti, ktorá podporila prednášku.</span>',
        },
      ],
    },
    abstractConditions: [
      {
        text: '<span>Abstrakt bude súčasťou recenzovaného zborníka abstraktov s prideleným ISBN číslom, ak bude odovzdaný v stanovených termínoch.</span>',
      },
      {
        text: '<span>Mená a priezviská autorov/spoluautorov je potrebné uvádzať celé, bez použitia skratiek, titulov alebo iniciál.</span>',
      },
      {
        text: '<span>Ku každému autorovi/spoluautorovi príspevku je potrebné uviesť aj jeho pracovisko, pričom použitie skratiek nie je prípustné.</span>',
      },
      {
        text: '<span>Abstrakt musí pozostávať z týchto častí: Úvod, cieľ, metódy, výsledky, záver, konflikt záujmov a kľúčové slová (3 - 5 slov).</span>',
      },
      {
        text: '<span>Maximálny počet slov abstraktu je limitovaný na 250.</span>',
      },
      {
        text: '<span>Abstrakt môže byť napísaný len v slovenskom alebo českom jazyku.</span>',
      },
      { text: '<span>Súčasťou abstraktu nemôžu byť tabuľky a grafy.</span>' },
      {
        text: '<span>V abstrakte je možné použiť štandardné a všeobecne známe skratky. V prípade použitia špeciálnej skratky je pri jej prvom použití potrebné význam vysvetliť.</span>',
      },
    ],
    sendAbstract:
      '<span>Abstrakt je <b>možné doručiť len vyplnením vopred určeného formulára</b> dostupného vo svojom profile po prihlásení sa do účtu.</span>',
  };
}
