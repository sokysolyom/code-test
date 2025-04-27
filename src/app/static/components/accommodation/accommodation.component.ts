import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IntroductionListCustomComponent } from '@app/shared/components/introduction-list-custom/introduction-list-custom.component';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { IAccommodationData, IVenueData } from '@app/static/types/general.type';
import { VenueDataComponent } from '../venue-data/venue-data.component';

/**
 * This component is used to display the accommodation page.
 */
@Component({
  selector: 'summeet-accommodation',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    TitleOverlayComponent,
    IntroductionListCustomComponent,
    VenueDataComponent,
  ],
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccommodationComponent {
  public accommodationData: IAccommodationData[] = [
    {
      accommodation: {
        description: `<span><p>Registráciu ubytovania spolu s prihlásením na podujatie je možné uskutočniť do vyčerpania rezervovanej kapacity hotela.</p>
                <p>Ubytovanie počas podujatia je pre zdravotníckych pracovníkov spoplatnené. Bližšie informácie nájdete v časti <a href="/general/registracia">INFORMÁCIE → REGISTRÁCIA A POPLATKY</a>.</p>
                <p>Ubytovanie počas podujatia je pre zástupcov partnerov zabezpečené v zmysle Ponuky pre partnerov, a to v závislosti od zvoleného typu partnerstva a/alebo objednaných doplnkových služieb.</p></span>
                `,
        equipment: [
          '<span>manželská posteľ alebo oddelené lôžka</span>',
          '<span>TV, internet a telefón</span>',
          '<span>minibar</span>',
          '<span>pracovný stôl</span>',
          '<span>bezpečnostný trezor</span>',
        ],
      },
      wayFromStations:
        '<span>Hotel je vzdialený od autobusovej stanice cca 9 min. cesty pešo.</span>',
      wayByPublicTransport:
        '<span>Hotel sa nachádza v blízkosti zastávky MHD - Martin, Hotel Turiec.</span>',
      addressStreet: '<span>A. Sokolíka 2, 036 01, Martin</span>',
      webPage: {
        link: 'https://hotelturiec.sk/',
        name: 'www.hotelturiec.sk',
      },
      telephoneNumbers: ['+421 43 4012077'],
      email: 'hotelturiec@hotelturiec.sk',
      checkIn:
        '<span>Na recepcii je možné ohlásiť príchod od 14:00 hod.</span>',
      checkOut:
        '<span>Na recepcii je potrebné ohlásiť odchod najneskôr do 11:00 hod.</span>',
      parking:
        '<span>Bližšie informácie ohľadom parkovania nájdete v časti <a href="/general/parkovanie">INFORMÁCIE → PARKOVANIE</a>.</span>',
      pets: '<span>Vstup do hotela a na podujatie je pre domáce zvieratá zakázaný. Účastníkovi, ktorý si na podujatie prinesie so sebou domáce zviera, bude zakázaný vstup do hotela a na podujatie.</span>',
    },
  ];

  public venueData: IVenueData = {
    hotel: '<span>Hotel Turiec</span>',
    addressCity: '<span><p>A. Sokolíka 2, 036 01, Martin</p></span>',
    photos: [
      'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/accommodation/accommodation1.jpg',
      'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/accommodation/accommodation2.jpg',
      'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/accommodation/accommodation3.jpg',
      'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/accommodation/accommodation4.jpg',
      'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/accommodation/accommodation5.jpg',
      'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/accommodation/accommodation6.jpg',
    ],
    positionMap: {
      street: 'Andreja Sokolíka',
      num: '132',
      city: 'Martin',
      zoom: 2,
    },
    iFrameUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3545.3661482110924!2d18.9216147513582!3d49.06186081383082!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714fedd8f1d9677%3A0x2cd2200e1ad35a97!2sHotel%20Turiec!5e1!3m2!1ssk!2ssk!4v1737653596278!5m2!1ssk!2ssk',
    buttonLink:
      // eslint-disable-next-line quotes
      `https://www.google.com/maps/dir//Hotel+Turiec,+2,+Andreja+Sokolíka+132,+036+01+Martin/@49.0620295,18.9208391,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x4714fedd8f1d9677:0x2cd2200e1ad35a97!2m2!1d18.9234509!2d49.0620887?hl=sk&entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D`,
  };
}
