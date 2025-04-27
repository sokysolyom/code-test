import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedListCustomComponent } from '@app/shared/components/shared-list-custom/shared-list-custom.component';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { IPosterData } from '@app/static/types/general.type';

/**
 * This interface is used to define the poster data.
 */
@Component({
  selector: 'summeet-poster',
  standalone: true,
  imports: [
    TitleOverlayComponent,
    CommonModule,
    MatIconModule,
    SharedListCustomComponent,
  ],
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PosterComponent {
  public posterData: IPosterData = {
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
    <td>15.04.2025</td>
  </tr>
  <tr>
    <td>Odovzdanie posterov</td>
    <td>-</td>
    <td>15.04.2025</td>
  </tr>
</table>
        `,
    activityConditions: [
      {
        text: '<span>Registrácia aktívnej účasti podlieha schváleniu organizátora podujatia.</span>',
      },
      {
        text: '<span>Registrácia aktívnej účasti vo forme posteru bude posudzovaná organizačným výborom až po odovzdaní posteru.</span>',
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
        text: '<span>Organizátor podujatia je oprávnený odmietnuť, prípadne vrátiť na prepracovanie, znenie posteru, ak nespĺňa formálne a obsahové náležitosti.</span>',
      },
    ],
    prohibitedContent: {
      listTitle: '<span>Poster <b>nesmie</b> obsahovať:</span>',
      list: [
        {
          text: '<span>obchodný názov akéhokoľvek lieku (SPC lieku je povolené),</span>',
        },
        {
          text: '<span>rreklamným spôsobom používať názov a logo farmaceutickej spoločnosti</span>',
        },
      ],
    },
    posterConditions: [
      { text: '<span>Rozmery posteru (šírka x výška): 90 cm x 120 cm.</span>' },
      {
        text: '<span>Podporované formáty dokumentu posteru: .ppt, .pptx, .pps.',
      },
      {
        text: '<span>Mená a priezviská autorov/spoluautorov je potrebné uvádzať celé, bez použitia skratiek, titulov alebo iniciál.</span>',
      },
      {
        text: '<span>Ku každému autorovi/spoluautorovi príspevku je potrebné uviesť aj jeho pracovisko, pričom použitie skratiek nie je prípustné.</span>',
      },
      {
        text: '<span>Poster musí pozostávať z týchto častí: Úvod, cieľ, metódy, výsledky, záver, konflikt záujmov a kľúčové slová (3 - 5 slov).</span>',
      },
      {
        text: '<span>Maximálny počet slov je limitovaný rozmerom posteru.</span>',
      },
      {
        text: '<span>Poster môže byť napísaný len v slovenskom alebo českom jazyku.</span>',
      },
      {
        text: '<span>V posteri je možné použiť štandardné a všeobecne známe skratky. V prípade použitia špeciálnej skratky je pri jej prvom použití potrebné význam vysvetliť.</span>',
      },
    ],
    // posterTemplate:
    //   '<span>Na prípravu posteru odporúčame použiť šablónu dostupnú na stiahnutie v časti <a href="/general/sablony">AKTÍVNA ÚČASŤ → ŠABLÓNY</a>',
    sendPoster: {
      text: 'Poster je možné:',
      methods: [
        {
          text: '<span>odoslať prostredníctvom emailu na email organizátora: <a href="mailto::office@summeet.sk">office@summeet.sk</a>,</span>',
        },
        {
          text: '<span>nahrať (upload) vo svojom profile po prihlásení sa do účtu.</span>',
        },
      ],
    },
  };
}
