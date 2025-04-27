import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { IIntroductionData } from '@app/static/types/general.type';
import { environment } from '@env';
import { IAppState } from '@app/state/app.state';
import { IntroductionListCustomComponent } from '@app/shared/components/introduction-list-custom/introduction-list-custom.component';
import { SharedListCustomComponent } from '@app/shared/components/shared-list-custom/shared-list-custom.component';
import { WINDOW_REF } from '@app/core/utils/window-ref';
import { IntroductionPeopleComponent } from '../introduction-people/introduction-people.component';
/**
 * This component is used to display the introduction page.
 */
@Component({
  selector: 'summeet-introduction',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    IntroductionListCustomComponent,
    SharedListCustomComponent,
    MatMenuModule,
    MatButtonModule,
    IntroductionPeopleComponent,
  ],
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IntroductionComponent implements OnInit {
  public introductionData: IIntroductionData = {
    header: {
      annual: 'XXXI. ročník',
      titleBig:
        '<span>Slovensko-Česká konferencia<br> o hemostáze a trombóze</span>',
      titleSmall: '<span>s medzinárodnou účasťou</span>',
      hashtag: '#hemostazamartin',
      date: '22. - 23. máj 2025',
      place: 'Aula Magna, Jesseniova lekárska fakulta UK v Martine',
    },
    calendarUrls: {
      google:
        'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20250522%2F20250524&details=V%C3%A1%C5%BEen%C3%A9%20kolegyne%2C%20v%C3%A1%C5%BEen%C3%AD%20kolegovia%2C%0A%0Aje%20n%C3%A1m%20pote%C5%A1en%C3%ADm%20V%C3%A1s%20pozva%C5%A5%20na%C2%A0v%20porad%C3%AD%20u%C5%BE%20XXXI.%20ro%C4%8Dn%C3%ADk%C2%A0vedecko-odborn%C3%A9ho%20podujatia%20s%0An%C3%A1zvom%C2%A0Slovensko-%C4%8Cesk%C3%A1%C2%A0konferencia%20o%20hemost%C3%A1ze%20a%20tromb%C3%B3ze.%C2%A0%0APodujatie%20sa%20uskuto%C4%8Dn%C3%AD%20v%20d%C5%88och%C2%A022.%C2%A0%E2%80%93%C2%A023.%20m%C3%A1ja%202025%20v%20priestoroch%C2%A0Aula%20Magna%2C%0AJesseniovej%20lek%C3%A1rskej%20fakulta%20Univerzity%20Komensk%C3%A9ho%20v%C2%A0Martine.%0ATe%C5%A1%C3%ADme%20sa%20na%20Va%C5%A1u%20%C3%BA%C4%8Das%C5%A5%21%0A%0Aprof.%20MUDr.%20J%C3%A1n%20Sta%C5%A1ko%2C%20PhD.%2C%20prezident%20podujatia%20%C3%A1no%0Aprof.%20MUDr.%20Pavel%20%C5%BD%C3%A1k%2C%20Ph.D.%2C%20prezident%20podujatia&location=&text=Slovensko-%C4%8Cesk%C3%A1%20konferencia%20o%20hemost%C3%A1ze%20a%20tromb%C3%B3ze%20s%20medzin%C3%A1rodnou%20%C3%BA%C4%8Das%C5%A5ou',
      outlook:
        'https://outlook.live.com/calendar/0/action/compose?allday=true&body=V%C3%A1%C5%BEen%C3%A9%20kolegyne%2C%20v%C3%A1%C5%BEen%C3%AD%20kolegovia%2C%0A%0Aje%20n%C3%A1m%20pote%C5%A1en%C3%ADm%20V%C3%A1s%20pozva%C5%A5%20na%C2%A0v%20porad%C3%AD%20u%C5%BE%20XXXI.%20ro%C4%8Dn%C3%ADk%C2%A0vedecko-odborn%C3%A9ho%20podujatia%20s%0An%C3%A1zvom%C2%A0Slovensko-%C4%8Cesk%C3%A1%C2%A0konferencia%20o%20hemost%C3%A1ze%20a%20tromb%C3%B3ze.%C2%A0%0APodujatie%20sa%20uskuto%C4%8Dn%C3%AD%20v%20d%C5%88och%C2%A022.%C2%A0%E2%80%93%C2%A023.%20m%C3%A1ja%202025%20v%20priestoroch%C2%A0Aula%20Magna%2C%0AJesseniovej%20lek%C3%A1rskej%20fakulta%20Univerzity%20Komensk%C3%A9ho%20v%C2%A0Martine.%0ATe%C5%A1%C3%ADme%20sa%20na%20Va%C5%A1u%20%C3%BA%C4%8Das%C5%A5%21%0A%0Aprof.%20MUDr.%20J%C3%A1n%20Sta%C5%A1ko%2C%20PhD.%2C%20prezident%20podujatia%20%C3%A1no%0Aprof.%20MUDr.%20Pavel%20%C5%BD%C3%A1k%2C%20Ph.D.%2C%20prezident%20podujatia&enddt=2025-05-24T19%3A30%3A00&location=&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2025-05-22T19%3A30%3A00&subject=Slovensko-%C4%8Cesk%C3%A1%20konferencia%20o%20hemost%C3%A1ze%20a%20tromb%C3%B3ze%20s%20medzin%C3%A1rodnou%20%C3%BA%C4%8Das%C5%A5ou',
      office:
        'https://outlook.office.com/calendar/0/action/compose?allday=true&body=V%C3%A1%C5%BEen%C3%A9%20kolegyne%2C%20v%C3%A1%C5%BEen%C3%AD%20kolegovia%2C%0A%0Aje%20n%C3%A1m%20pote%C5%A1en%C3%ADm%20V%C3%A1s%20pozva%C5%A5%20na%C2%A0v%20porad%C3%AD%20u%C5%BE%20XXXI.%20ro%C4%8Dn%C3%ADk%C2%A0vedecko-odborn%C3%A9ho%20podujatia%20s%0An%C3%A1zvom%C2%A0Slovensko-%C4%8Cesk%C3%A1%C2%A0konferencia%20o%20hemost%C3%A1ze%20a%20tromb%C3%B3ze.%C2%A0%0APodujatie%20sa%20uskuto%C4%8Dn%C3%AD%20v%20d%C5%88och%C2%A022.%C2%A0%E2%80%93%C2%A023.%20m%C3%A1ja%202025%20v%20priestoroch%C2%A0Aula%20Magna%2C%0AJesseniovej%20lek%C3%A1rskej%20fakulta%20Univerzity%20Komensk%C3%A9ho%20v%C2%A0Martine.%0ATe%C5%A1%C3%ADme%20sa%20na%20Va%C5%A1u%20%C3%BA%C4%8Das%C5%A5%21%0A%0Aprof.%20MUDr.%20J%C3%A1n%20Sta%C5%A1ko%2C%20PhD.%2C%20prezident%20podujatia%20%C3%A1no%0Aprof.%20MUDr.%20Pavel%20%C5%BD%C3%A1k%2C%20Ph.D.%2C%20prezident%20podujatia&enddt=2025-05-24T19%3A30%3A00&location=&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2025-05-22T19%3A30%3A00&subject=Slovensko-%C4%8Cesk%C3%A1%20konferencia%20o%20hemost%C3%A1ze%20a%20tromb%C3%B3ze%20s%20medzin%C3%A1rodnou%20%C3%BA%C4%8Das%C5%A5ou',
      apple:
        'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/hemostaza-martin.ics',
    },
    logoUrl:
      'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/sckht-logo.png',
    introductionText: `<span><p>Vážené kolegyne, vážení kolegovia,</p>
        <p>je nám potešením Vás informovať, že Slovenská spoločnosť hemostázy a trombózy organizuje <b>v roku 2025</b> v poradí už <b>XXXI. ročník</b> vedecko-odborného podujatia s názvom <b>Slovensko-Česká konferencia o hemostáze a trombóze.</b></p>
        <p>Podujatie sa uskutoční v dňoch <b>22. - 23. mája 2025</b> v priestoroch <b>Aula Magna, Jesseniovej lekárskej fakulta Univerzity Komenského v Martine.</b></p>
        <p>Tešíme sa na Vašu účasť!</p></span>`,
    introductionPresidents: [
      {
        fullName: '<span>prof. MUDr. Ján Staško, PhD.</span>',
        workPlace: '<span>prezident podujatia</span>',
        // photo:
        //   'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/people/stasko.jpeg',
      },
      {
        fullName: '<span>prof. MUDr. Pavel Žák, Ph.D.</span>',
        workPlace: '<span>prezident podujatia</span>',
        // photo:
        //   'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/people/zak.jpg',
      },
    ],
    mainThemes: [
      { text: '<span>Fyziológia a patofyziológia hemostázy</span>' },
      { text: '<span>Vrodené a získané trombofilné stavy</span>' },
      { text: '<span>Vrodené a získané krvácavé stavy</span>' },
      { text: '<span>Život ohrozujúce krvácanie a koagulačné faktory</span>' },
      { text: '<span>Malígne ochorenia a hemostáza</span>' },
      {
        text: '<span>Novinky v laboratórnej diagnostike porúch hemostázy<br> a monitorovaní hemostázy</span>',
      },
      { text: '<span>Hemostáza v iných klinických odboroch</span>' },
      { text: '<span>Aktuality v liečbe porúch hemostázy a trombózy</span>' },
      { text: '<span>Ošetrovateľstvo v hematológii a transfúziológii</span>' },
    ],

    conferencePresident: [
      {
        fullName: '<span>prof. MUDr. Ján Staško, PhD.</span>',
        workPlace:
          '<span>Klinika hematológie a transfúziológie JLF UK a UN Martin</span>',
        photo:
          'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/people/stasko.jpeg',
      },
      {
        fullName: '<span>prof. MUDr. Pavel Žák, Ph.D.</span>',
        workPlace:
          '<span>IV. Interná hematologická klinika FN Hradec Králové a LF Hradec Králové</span>',
        photo:
          'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/people/zak.jpg',
      },
    ],
    honoraryPresidents: [
      {
        fullName: '<span>prof. MUDr. Jaroslav Malý, CSc.</span>',
        // photo:
        //   'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/no-photo.png',
      },
      {
        fullName: '<span>prof. MUDr. Peter Kubisz, DrSc. - in memoriam</span>',
        // photo:
        //   'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/no-photo.png',
      },
    ],
    honoraryPresidency: [
      {
        fullName: '<span>prof. MUDr. Andrea Čalkovská, DrSc.</span>',
        workPlace:
          '<span>dekanka Jesseniovej lekárskej fakulty (JLF UK) v Martine</span>',
        // photo:
        //   'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/no-photo.png',
      },
      {
        fullName: '<span>MUDr. Peter Durný, PhD., MPH</span>',
        workPlace: '<span>riaditeľ Univerzitnej nemocnice Martin (UNM)</span>',
        // photo:
        //   'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/no-photo.png',
      },
      {
        fullName: '<span>prof. MUDr. Ján Danko, CSc.</span>',
        workPlace: '<span>primátor mesta Martin</span>',
        // photo:
        //   'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/no-photo.png',
      },
      {
        fullName: '<span>MUDr. Jaromír Gumulec</span>',
        workPlace:
          '<span>prezident České společnosti pro trombózu a hemostázu (ČSTH) České lékařské společnosti Jana Evangelisty Purkyně</span>',
        // photo:
        //   'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/no-photo.png',
      },
    ],
    organizingCommittee: [
      {
        fullName: '<span>MUDr. Ivana Plameňová, PhD., MBA</span>',
        workPlace: '<span>Predseda organizačného výboru</span>',
        // photo:
        //   'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/no-photo.png',
      },
    ],
    scientificCommittee: [
      {
        fullName: '<span>doc. MUDr. Juraj Sokol, PhD., MBA</span>',
        workPlace: '<span>Predseda vedeckého výboru</span>',
        // photo:
        //   'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/no-photo.png',
      },
    ],
    eventOrganizer: {
      text: `<span><b>Slovenská spoločnosť hemostázy a trombózy</b>, so sídlom Strojárenská 3426/11 04001
          Košice - mestská časť Staré Mesto, IČO: 31 310 281, registrovaná MV SR pod č. VVS/1-
          900/90-15876 ako kolektívny člen Slovenskej lekárskej spoločnosti, so sídlom Cukrová
          2373/3, 813 22 Bratislava-Staré Mesto IČO: 00 178 624, registrovaná MV SR pod č. VVS/1-
          909/90-172</span>`,
      imgsrc:
        'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/ssht-logo.png',
    },
    eventCoOrganizer: {
      text: '<span><b>Česká společnost pro trombózu a hemostázu</b> České lékařské společnosti J. E. Purkyně, z.s., so sídlom Sokolská 490/31, 120 00 Praha 2, IČO: 00 444 359</span>',
      imgsrc:
        'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/csth-logo.png',
    },
    underTheAuspices: [
      '<span>Univerzita Komenského v Bratislave</span>',
      '<span>Jesseniova lekárska fakulta v Martine</span>',
      '<span>Univerzitná nemocnica Martin</span>',
      '<span>Klinika hematológie a transfúziológie</span>',
      '<span>Národné centrum hemostázy a trombózy</span>',
    ],
  };
  public organizingCommitteeNames1: string[] = [
    'MUDr. Monika Brunclíková, PhD.',
    'MUDr. Miroslava Dobrotová, PhD.',
    'MUDr. Emília Flochová, PhD.',
    'MUDr. Pavol Hollý, PhD.',
    'MUDr. Juraj Chudej, PhD., MBA',
    'MUDr. Zuzana Jedináková, PhD.',
    'MUDr. Lenka Lisá, PhD.',
  ];
  public organizingCommitteeNames2: string[] = [
    'MUDr. Renáta Pizurová',
    'MUDr. Lucia Stančiaková, PhD.',
    'MUDr. Radoslava Šimonová, PhD.',
    'MUDr. Tomáš Šimurda, PhD., MPH',
    'MUDr. Ľubica Váleková, PhD.',
    'RNDr. Jana Žolková, PhD.',
    'Petra Maťovčíková',
  ];
  public scientificCommitteNames1: string[] = [
    'prof. MUDr. Angelika Bátorová, PhD.',
    'doc. MUDr. Jan Blatný, Ph.D.',
    'doc. MUDr. Denisa Čelovská, PhD.',
    'prof. MUDr. Petr Dulíček, Ph.D.',
    'doc. MUDr. Jana Hirmerová, Ph.D.',
    'RNDr. Ingrid Hrachovinová, Ph.D.',
  ];
  public scientificCommitteNames2: string[] = [
    'MUDr. Jan Hudeček, CSc.',
    'doc. MUDr. Mária Hulíková, PhD.',
    'doc. MUDr. Tomáš Kvasnička, CSc.',
    'doc. Mgr. Luděk Slavík, Ph.D.',
    'prof. MUDr. Viera Štvrtinová, CSc., FESVM',
    'MUDr. Alexander Wild, PhD.',
  ];
  private readonly store = inject(Store<IAppState>);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  // private readonly userService = inject(UserService);

  public isRegistratDisabled = environment.isRegistratDisabled;
  public isMobile = false;
  private readonly window = inject(WINDOW_REF);

  /**
   * This method is used to listen to the window resize event
   * @param {object} event - The event object
   * @param {object} event.target - The target object
   * @param {number} event.target.innerWidth - The inner width of the target
   * @returns {void}
   */
  @HostListener('window:resize', ['$event'])
  public onResize(event: { target: { innerWidth: number } }): void {
    this.isMobile = event.target.innerWidth > 959 ? false : true;
  }

  /**
   * This method is called when the component is initialized
   * @returns {void}
   */
  public ngOnInit(): void {
    this.onResize({ target: { innerWidth: this.window.innerWidth } });
  }

  /**
   * This method is called when the user wants to participate.
   * @returns {void}
   */
  public participate(): void {
    void this.router.navigate(['/auth/prehlad']);
  }
}
