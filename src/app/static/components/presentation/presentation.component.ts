import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedListCustomComponent } from '@app/shared/components/shared-list-custom/shared-list-custom.component';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { IPresentationData } from '@app/static/types/general.type';

/**
 * This component is used to display the presentation page.
 */
@Component({
  selector: 'summeet-presentation',
  standalone: true,
  imports: [
    TitleOverlayComponent,
    SharedListCustomComponent,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PresentationComponent {
  public presentationData: IPresentationData = {
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
<td>Odovzdanie abstraktov</td>
<td>-</td>
<td>15.04.2025</td>
</tr>
<tr>
<td>Odovzdanie prezentácie</td>
<td>-</td>
<td>22.05.2025</td>
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
        text: '<span>Ak záujemca o aktívnu účasť nebol informovaný o schválení aktívnej účasti do 30 kalendárnych dní odo dňa konca registrácie aktívnej účasti, má sa za to, že jeho registrácia aktívnej účasti nebola schválená.</span>',
      },
      {
        text: '<span>Organizátor podujatia je oprávnený neschváliť registráciu aktívnej účasti bez udania dôvodu.</span>',
      },
      {
        text: '<span>Organizátor podujatia je oprávnený odmietnuť, prípadne vrátiť na prepracovanie, znenie prezentácie, ak nespĺňa formálne a obsahové náležitosti.</span>',
      },
    ],
    prohibitedContent: {
      listTitle: '<span>Prezentácia <b>nesmie</b> obsahovať:</span>',
      list: [
        {
          text: '<span>obchodný názov akéhokoľvek lieku (SPC lieku je povolené),</span>',
        },
        {
          text: '<span>reklamným spôsobom používať názov a logo farmaceutickej spoločnosti, ktorá podporila prednášku (referencia na farmaceutickú spoločnosť je povolená).</span>',
        },
      ],
    },
    presentationConditions: [
      {
        text: '<span>Podporované formáty dokumentu prezentácie: .ppt, .pptx, .pps.</span>',
      },
      { text: '<span>Pomer strán prezentácie: širokouhlý formát 16:9.</span>' },
      {
        text: '<span>Podporované formáty obrazových súborov: .jpg, .gif, .bmp, .png.</span>',
      },
      {
        text: '<span>Podporované formáty videosúborov: .avi, .mpeg, .mp4.</span>',
      },
    ],
    // presentationTemplate:
    //   '<span>Na prípravu prezentácie odporúčame použiť šablónu dostupnú na stiahnutie v časti <a href="/general/sablony">AKTÍVNA ÚČASŤ → ŠABLÓNY</a>',
    presentationTime: [
      { text: '<span>Časový limit na jednu prednášku je 12 min.</span>' },
      {
        text: '<span>Prednášajúci má k dispozícii časomieru zobrazenú na obrazovke pred sebou.</span>',
      },
      {
        text: '<span>Člen predsedníctva bloku je oprávnený prerušiť alebo zastaviť prednášku, ak prednášajúci prekročí časový limit.</span>',
      },
    ],
    sendPresentation: {
      text: 'Prezentáciu je možné:',
      methods: [
        {
          text: '<span>odoslať prostredníctvom emailu na email organizátora: <a href="mailto::office@summeet.sk">office@summeet.sk</a>,</span>',
        },
        {
          text: '<span>odovzdať (podporované nosiče: USB, SD karta) technikovi nachádzajúcemu sa v prednáškovej miestnosti najneskôr hodinu pred vlastnou prednáškou,</span>',
        },
        {
          text: '<span>nahrať (upload) vo svojom profile po prihlásení sa do účtu.</span>',
        },
      ],
    },
    peresentationLawImageUrl:
      'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/mladi-hematologovia/public/presentation-law.png',
  };
}
