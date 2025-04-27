import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedListCustomComponent } from '@app/shared/components/shared-list-custom/shared-list-custom.component';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { IRegisterPageData } from '@app/static/types/general.type';

/**
 * This component is used to display the register page.
 */
@Component({
  selector: 'summeet-register-page',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    TitleOverlayComponent,
    SharedListCustomComponent,
    MatTooltipModule,
  ],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterPageComponent {
  public registerPageData: IRegisterPageData = {
    conferenceRegisterTerm: `
<table>
<tr>
<th></th>
<th>Začiatok</th>
<th>Koniec</th>
</tr>
<tr>
<td>Skorá registrácia online</td>
<td>-</td>
<td>15.04.2025</td>
</tr>
<tr>
<td>Neskorá registrácia online</td>
<td>16.04.2025</td>
<td>05.05.2025</td>
</tr>
<tr>
<td>Registrácie na mieste podujatia</td>
<td>22.05.2025</td>
<td>23.05.2025</td>
</tr>
</table>`,
    activityRegisterTerm: `
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
<tr>
<td>Odovzdanie posterov</td>
<td>-</td>
<td>15.04.2025</td>
</tr>
</table>
`,
    registrationConditions: [
      {
        text: '<span>Registráciu na podujatie je možné uskutočniť výlučne (i) online, prostredníctvom webovej stránky podujatia, alebo (ii) na mieste a v čase konania podujatia.</span',
      },
      {
        text: `<span>Pred registráciou na podujatie je potrebné si vytvoriť účet použiteľný aj na iné podujatia zastrešované spoločnosťou SUMMEET s. r. o.<br>
        Po úspešnom vytvorení účtu systém automaticky zašle účastníkovi, na ním zvolený email, informáciu o vytvorení účtu.
          </span>`,
      },
      {
        text: `<span>Po vytvorení účtu je potrebné sa registrovať na podujatie, o ktoré má účastník záujem.<br>
            Po úspešnej registrácii na podujatie systém automaticky zašle účastníkovi informáciu o registrácii na podujatie.</span>`,
      },
      {
        text: '<span><b>Ak sa účastník podujatia nezúčastní podujatia vzniká organizátorovi podujatia nárok na úhradu nákladov spojených s objednanými službami.</b></span>',
      },
      {
        text: '<span>Registráciu zástupcu partnera na podujatie je možné vykonať len so súhlasom organizátora podujatia.</span>',
      },
    ],
    registrationFee: {
      table: `
  <table>
<tr>
<th></th>
<th><div><span>Skorá </br> registrácia </span><span class="material-icons" title="od 25.03.2024 do 01.05.2024">info</span></div></th>
<th><div><span>Neskorá </br> registrácia </span><span class="material-icons" title="od 02.05.2024 do 20.05.2024">info</span></div></th>
<th><div><span>Registrácia </br> na mieste </span><span class="material-icons" title="od 07.06.2024 do 08.06.2024">info</span></div></th>
</tr>
<tr>
<td>Člen Slovenskej onkologickej spoločnosti</td>
<td>30 EUR</td>
<td>50 EUR</td>
<td>50 EUR</td>
</tr>
<tr>
<td>Zdravotnícky pracovník</td>
<td>50 EUR</td>
<td>70 EUR</td>
<td>70 EUR</td>
</tr>
<tr>
<td>Zástupca partnera</td>
<td>50 EUR</td>
<td>70 EUR</td>
<td>70 EUR</td>
</tr>
</table>
  `,
      text: '<span><p>* Uvedené ceny sú bez DPH.</p></span>',
    },
    accommodationFee: {
      table: `
  <table>
<tr>
<th></th>
<th>22.05.2025</th>
<th>23.05.2025</th>
</tr>
<tr>
<td>Ubytovanie</td>
<td>60 EUR</td>
<td>-</td>
</tr>
<tr>
<td>Strava pri ubytovaní</td>
<td>20 EUR</td>
<td>20 EUR</td>
</tr>
<tr>
<td>Strava bez ubytovania</td>
<td>20 EUR</td>
<td>20 EUR</td>
</tr>
<tr>
<td>Zástupca partnera</td>
<td colspan="2">Ceny sú uvedené v Ponuke pre<br> partnerov v časti Doplnkové služby</td>
</tr>
</table>
  `,
    },
    paymentConditions: [
      {
        text: '<span>Úhradu poplatkov (napr. registračného poplatku, poplatkov za ubytovanie a stravu, a pod.) je možné uskutočniť (i) prostredníctvom platobnej brány vo svojom účte (ak je dostupná), alebo (ii) prevodom na účet, alebo (iii) na mieste a v čase podujatia.</span>',
      },
      {
        text: '<span>Po úspešnom registrovaní na podujatie systém automaticky zašle registrovanému účastníkovi zálohovú faktúru na sumu vo výške poplatkov spolu s informáciou o registrácii na podujatie.</span>',
      },
      {
        text: '<span><b>Ak zo strany účastníka nedôjde k úhrade poplatkov v lehote 7 kalendárnych dní odo dňa uskutočnenia registrácie na podujatie, registrácia účastníka na podujatí a objednané služby budú automaticky zrušené.</b></span>',
      },
      {
        text: '<span>Pri úhrade poplatkov prevodom na účet je v platobnom príkaze potrebné uviesť variabilný symbol uvedený na zálohovej faktúre. <b>V opačnom prípade systém automaticky nespáruje platbu a registrácia účastníka na podujatí a objednané služby budú automaticky zrušené.</b></span>',
      },
      {
        text: '<span><b>Úhrada poplatkov po ich zaplatení je nevratná, a to bez ohľadu na skutočnú účasť na podujatí alebo využitie objednaných služieb.</b></span>',
      },
      {
        text: '<span>Do 30 kalendárnych dní odo dňa skončenia podujatia bude účastníkovi podujatia zaslaná riadna faktúra za úhradu poplatkov.</span>',
      },
      {
        text: '<span>V registračnom poplatku je zahrnutý vstup do priestorov miesta konania podujatia, vstup na odborný program, materiály podujatia a catering počas prestávok.</span>',
      },
    ],
    inPlaceRegistration: [
      {
        text: '<span>Pri registrácii na mieste podujatia nie je možné objednať ubytovanie a stravu.</span>',
      },
      {
        text: '<span>Registračný poplatok na mieste podujatia je možné uhradiť v hotovosti alebo platobnou kartou.</span>',
      },
      {
        text: '<span>Registráciu na mieste je možné uskutočniť v registračných stánkoch.</span>',
      },
    ],
    catheringRegister: [
      {
        text: '<span>Registrácia ubytovania a stravy je možná len do vyčerpania rezervovaných kapacít.</span>',
      },
      {
        text: `<span>Za účelom efektívneho a hospodárneho využitia maximálnej možnej rezervovanej kapacity hotela budú izby hotela obsadzované počtom účastníkov, ktorý zodpovedá maximálnym možným kapacitám izieb (napr. dvojlôžková izba bude obsadená dvomi účastníkmi). Izby budú obsadzované účastníkmi podľa náhodného výberu s prihliadnutím na pohlavie účastníka.<br>
          Účastník podujatia má pri výbere ubytovania možnosť uviesť preferovaného spolubývajúceho. Na ubytovanie účastníka podujatia s preferovaným spolubývajúcim nemá účastník podujatia nárok, a teda nie je garantované.</span>`,
      },
      {
        text: '<span>Pred zadaním preferovaného spolubývajúceho je potrebné túto osobu informovať o jej výbere ako preferovaného spolubývajúceho.</span>',
      },
      {
        text: '<span>Po vyčerpaní rezervovaných kapacít ubytovania a stravy si účastník podujatia zabezpečuje ubytovanie a stravu sám a na vlastné náklady.</span>',
      },
      {
        text: '<span>V prípade záujmu o prístelku kontaktujte spoločnosť SUMMEET s. r. o.</span>',
      },
    ],
    registerChange: [
      {
        text: `<span>Zmenu registrácie je možné v rozsahu účasti na podujatí, ubytovania a stravy vykonať <b>len so súhlasom organizátora a za storno poplatok vo výške hodnoty
        objednaných služieb</b>, ak nebolo na základe rozhodnutia organizátora určené inak. Storno poplatkom nie je dotknutý nárok organizátora na úhradu iných poplatkov, ako
        napr. registračného poplatku, ak sa uhrádza.</span>`,
      },
      {
        text: '<span><b>Zmenu registrácie v rozsahu účasti na podujatí, ubytovania a stravy je možné vykonať len so súhlasom organizátora. Účastník nemá nárok na vrátenie už zaplatených poplatkov, ak nebolo na základe rozhodnutia organizátora určené inak.</b></span>',
      },
      {
        text: '<span>Zmena osobných údajov (vrátane údajov o pracovisku, a pod.) je bezplatná a časovo neobmedzená.</span>',
      },
    ],
    conditionsChange:
      '<span>Organizátor podujatia si vyhradzuje právo na zmenu registračných podmienok a časov bez udania dôvodu.</span>',
  };
}
