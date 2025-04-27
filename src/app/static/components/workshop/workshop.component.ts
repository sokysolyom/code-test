import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IntroductionListCustomComponent } from '@app/shared/components/introduction-list-custom/introduction-list-custom.component';
import { SharedListCustomComponent } from '@app/shared/components/shared-list-custom/shared-list-custom.component';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { IWorkshopData } from '@app/static/types/general.type';

/**
 * This component is used to display the workshop.
 */
@Component({
  selector: 'summeet-workshop',
  standalone: true,
  imports: [
    TitleOverlayComponent,
    MatCardModule,
    MatIconModule,
    CommonModule,
    IntroductionListCustomComponent,
    SharedListCustomComponent,
  ],
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkshopComponent {
  public workshopData: IWorkshopData[] = [
    {
      sponsor: {
        title:
          '<span>Ako sa nestratiť v štatistike pri príprave diplomovej, atestačnej, dizertačnej práce alebo pri čítaní klinických štúdii</span>',
        partner:
          '<span>Workshop podporený spoločnosťou SERVIER SLOVENSKO spol. s r.o.</span>',
      },
      date: '<span>07. február 2025</span>',
      time: '<span>10.00 - 16.00 hod.</span>',
      capacity: '<span>Kapacita je obmedzená.</span>',
      registration: {
        text: '<span>Registráciu na workshop môžete uskutočniť do 31.01.2024 kontaktovaním nasledovných osôb:</span>',
        name: '<span>MUDr. Juraj Chudej, PhD., MBA</span>',
        email: '<span>jurajchudej@summeet.sk</span>',
      },
      lectors: [
        '<span>Laura Johanesová (Data Science Academy, o.z.)</span>',
        '<span>Jakub Hantabal (Data Science Academy, o.z.)</span>',
      ],
      isTimeInProgram: false,
      program: [
        {
          title: '<span>Mini-Lecture 1: Základy štatistiky</span>',
          themes: [
            {
              text: '<span>Zopakujeme si základy štatistickej analýzy: základné parametre, teóriu o hypotézach a kde použiť aký test.</span>',
            },
          ],
        },
        {
          title:
            '<span>Workshop 1: Základy štatistiky a Testovanie Hypotéz</span>',
          themes: [],
        },
        {
          title: '<span>Mini-Lecture 2: Ako funguje klinický test</span>',
          themes: [
            {
              text: '<span>Povieme si o výstupoch klinických testov, aké sú najčastejšie klinické dáta, o tom, ako nastaviť hypotézu klinického testu a o tom, ako vypočítať správnu veľkosť populácie na klinický test.</span>',
            },
          ],
        },
        {
          title:
            '<span>Workshop 2: Experimentálny dizajn a formulovanie hypotézy</span>',
          themes: [],
        },
        {
          title:
            '<span>Mini-Lecture 3: Prezentácia dát: do’s and don’ts</span>',
          themes: [
            {
              text: '<span>Pozrieme sa na príklady prezentácie dát vo vede a médiách a ukážeme si, čo funguje, čo nefunguje, a čím sa môžeme inšpirovať do našej práce.</span>',
            },
          ],
        },
        {
          title:
            '<span>Workshop 3: Čítanie vedeckej literatúry (a ako z nej dostať dáta)</span>',
          themes: [],
        },
        {
          title: '<span>Mini-Lecture 4: Common Statistical Pitfalls</span>',
          themes: [
            {
              text: '<span>Ukážeme si najčastejšie chyby a miskoncepcie štatistickej analýzy a ako sa im vyhnúť.</span>',
            },
          ],
        },
        {
          title:
            '<span>Workshop 4: Identifikácia nevhodnej analýzy v publikovanej literatúre / Posudzovanie kvality publikovaných analýz</span>',
          themes: [],
        },
      ],
    },
  ];
}
