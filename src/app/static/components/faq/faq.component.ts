import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IFAQData } from '@app/static/types/general.type';
import { IAppState } from '@app/state/app.state';
import {
  updateActiveDropDown,
  updateSidenavVisibility,
} from '@app/state/event/event.action';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { SharedListCustomComponent } from '@app/shared/components/shared-list-custom/shared-list-custom.component';

/**
 * This component is used to display the FAQ page.
 */
@Component({
  selector: 'summeet-faq',
  standalone: true,
  imports: [
    TitleOverlayComponent,
    CommonModule,
    MatIconModule,
    SharedListCustomComponent,
  ],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FaqComponent {
  public faqData: IFAQData = {
    organizer: {
      text: '<span><p><b>Slovenská spoločnosť hemostázy a trombózy,</b> so sídlom Strojárenská 3426/11 04001 Košice - mestská časť Staré Mesto, IČO: 31 310 281, registrovaná MV SR pod č. VVS/1- 900/90-15876</p><p> ako kolektívny člen <b>Slovenskej lekárskej spoločnosti</b>, so sídlom Cukrová 2373/3, 813 22 Bratislava-Staré Mesto IČO: 00 178 624, registrovaná MV SR pod č. VVS/1-909/90-172</p></span>',
      imageUrl:
        'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/ssht-logo.png',
    },
    coOrganizer: {
      text: '<span><b>Česká společnost pro trombózu a hemostázu</b> České lékařské společnosti J. E. Purkyně, z.s., so sídlom Sokolská 490/31, 120 00 Praha 2, IČO: 00 444 359</span>',
      imageUrl:
        'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/csth-logo.png',
    },
    entrustedCompany: {
      text: '<span><b>SUMMEET s. r. o.</b>, so sídlom Mozartova 4194/13, 811 02 Bratislava - mestská časť Staré Mesto, IČO: 54 059 305, DIČ: 212 156 82 29, IČ DPH: SK212 156 82 29, zapísaná v Obchodnom registri Mestského súdu Bratislava III, odd. Sro, vl. č. 155415/B</span>',
      imageUrl:
        'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/mladi-hematologovia/public/summeet-logo.png',
    },
    underTheAuspices: [
      {
        text: '<span>Univerzita Komenského v Bratislave</span>',
      },
      {
        text: '<span>Jesseniova lekárska fakulta v Martine</span>',
      },
      { text: '<span>Univerzitná nemocnica Martin</span>' },
      { text: '<span>Klinika hematológie a transfúziológie</span>' },
      { text: '<span>Národné centrum hemostázy a trombózy</span>' },
    ],
    accreditation: {
      law1: '<span>Podujatie je povinnou akreditovanou vzdelávacou aktivitou v zmysle § 42 zákona č. 578/2004 Z. z. o poskytovateľoch zdravotnej starostlivosti, zdravotníckych pracovníkoch, stavovských organizáciách v zdravotníctve a o zmene a doplnení niektorých zákonov v kategórii lekár v rámci špecializačného študijného programu „Hematológia a transfúziológia“ a certifikačného študijného programu „Komplexná diagnostika a liečba vrodených a získaných porúch hemostázy“ na JLF UK, bude zaradené do kontinuálneho medicínskeho vzdelávania a všetkým aktívnym a pasívnym účastníkom, pre ktorých je podujatie akreditované, budú pridelené kredity.</span>',
      accreditedFor: {
        text: '<span>Podujatie je akreditované pre:</span>',
        people: [
          { text: '<span>lekárov</span>' },
          { text: '<span>zdravotné sestry</span>' },
          { text: '<span>medicínsko-technických pracovníkov</span>' },
          { text: '<span>iných zdravotníckych pracovníkov</span>' },
        ],
      },
      law2: '<span>Zdravotnícky pracovník získa pasívnou alebo aktívnou účasťou na podujatí kredity v súlade s vyhláškou Ministerstva zdravotníctva Slovenskej republiky č. 74/2019 Z. z. o kritériách a spôsobe hodnotenia sústavného vzdelávania zdravotníckeho pracovníka. Potvrdenie o získanom počte kreditov za účasť na podujatí bude zdravotníckemu pracovníkovi doručené v elektronickej podobe do 30 dní odo dňa skončenia podujatia. Potvrdenie o získaných kreditoch nie je možné vystaviť na mieste podujatia.</span>',
    },
    participationConfirmation: `<span><p>Zdravotníckemu pracovníkovi bude vydané potvrdenie o účasti na podujatí v súlade s § 75 ods. 2 nariadenia vlády č. 296/2010 Z. z. o odbornej spôsobilosti na výkon zdravotníckeho povolania, spôsobe ďalšieho vzdelávania zdravotníckych pracovníkov, sústave špecializačných odborov a sústave certifikovaných pracovných činností.</p>
    <p>Potvrdenie o účasti na podujatí bude zdravotníckemu pracovníkovi doručené v elektronickej podobe do 7 dní odo dňa skončenia podujatia.</p><span>`,
    nonMonetaryPayment: `<span><p>Nadobudnutím účinnosti novely zákona č. 595/2003 Z. z. o dani z príjmov došlo od 01.01.2023 k oslobodeniu od dane z nepeňažných plnení poskytnutých vo forme hodnoty stravy, ubytovania a dopravy na odbornom podujatí určenom výhradne na vzdelávací účel.</p>
    <p>V zmysle zákona č. 362/2011 Z. z. o liekoch a zdravotníckych pomôckach a o zmene a doplnení niektorých zákonov zostala zachovaná povinnosť vystaviť zdravotníckemu pracovníkovi potvrdenie o výške nepeňažného plnenia a účele jeho poskytnutia.</p>
    <p>Potvrdenie o výške poskytnutého nepeňažného plnenia bude zdravotníckemu pracovníkovi doručené v elektronickej podobe do konca kalendárneho mesiaca po uplynutí kalendárneho roka, v ktorom bolo nepeňažné plnenie poskytnuté.</p></span>`,
    importantTerms: `<span>Dôležité termíny týkajúce sa registrácie a aktívnej účasti nájdete v časti <a href="/general/registracia">INFORMÁCIE → REGISTRÁCIA A POPLATKY</a>
    alebo v jednotlivých formách aktívnej účasti.</span>`,
    registrationInformation:
      '<span>Bližšie informácie o registrácii nájdete v časti  <a href="/general/registracia">INFORMÁCIE → REGISTRÁCIA A POPLATKY</a>.</span>',
    accommodation: `<span><p>Bližšie informácie o ubytovaní nájdete v časti <a href="/general/ubytovanie">INFORMÁCIE → UBYTOVANIE</a>.</p>
      <p>Bližšie informácie o poplatku za ubytovanie nájdete v časti <a href="/general/registracia">INFORMÁCIE → REGISTRÁCIA A POPLATKY</a>.</p></span>`,
    catering: {
      text1:
        '<span><p>Účastníci podujatia (vrátane zástupcov partnera) majú možnosť si v rámci registrácie vybrať nasledovnú stravu počas podujatia:</p></span>',
      text2: `<span><p>Alkoholické nápoje počas podujatia nie sú hradené organizátorom podujatia.</p>
        <p>Bližšie informácie o poplatku za stravu nájdete v časti <a href="/general/registracia">INFORMÁCIE → REGISTRÁCIA A POPLATKY</a>.</p></span>`,
      table: `<table>
  <tr>
    <th></th>
    <th>22.05.2025</th>
    <th>23.05.2025</th>
  </tr>
  <tr>
    <td>Raňajky (pre ubytovaných)</td>
    <td>NIE</td>
    <td>ÁNO</td>
  </tr>
  <tr>
    <td>Obed</td>
    <td>ÁNO</td>
    <td>ÁNO</td>
  </tr>
  <tr>
    <td>Večera</td>
    <td>ÁNO</td>
    <td>NIE</td>
  </tr>
</table>`,
    },
    parking:
      '<span>Bližšie informácie o možnostiach parkovania nájdete v časti <a href="/general/parkovanie">INFORMÁCIE → PARKOVANIE</a>.</span>',
    activeParticipation:
      '<span>Bližšie informácie týkajúce sa aktívnej účasti na podujatí a požiadaviek na abstrakt a prednášku nájdete v čast <a (click)="openDropdown()">AKTÍVNA ÚČASŤ</a>.</span>',
  };

  private readonly store = inject(Store<IAppState>);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public openDropdown(): void {
    if (window.innerWidth > 959) {
      this.store.dispatch(updateActiveDropDown({ content: true }));
    } else {
      this.store.dispatch(updateActiveDropDown({ content: true }));
      this.store.dispatch(updateSidenavVisibility({ content: true }));
    }
  }

  /**
   * This method is called when a key is pressed.
   * @param {KeyboardEvent} event - The event object
   * @returns {void}
   */
  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.openDropdown();
      event.preventDefault(); // Prevent default behavior for Space key
    }
  }
}
