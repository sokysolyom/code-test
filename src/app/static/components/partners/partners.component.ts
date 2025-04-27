import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { PartnerItemComponent } from '../partner-item/partner-item.component';

interface IPartner {
  src: string;
  link: string;
  isVirtualTent: boolean;
  name: string;
  hasVirtualTent: boolean;
  virtualTentLink: string;
}
/**
 * This component is used to display the partners.
 */
@Component({
  selector: 'summeet-partners',
  standalone: true,
  imports: [
    TitleOverlayComponent,
    CommonModule,
    MatIconModule,
    PartnerItemComponent,
  ],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent {
  public platinaPartnerLogos: IPartner[] = [
    // {
    //   src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Novartis_logo.jpeg',
    //   link: '',
    //   isVirtualTent: true,
    //   name: 'novartis',
    //   hasVirtualTent: false,
    //   virtualTentLink: '',
    // },
  ];
  public mainPartnersLogos: IPartner[] = [
    //   {
    //     src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/amgen_logo.png',
    //     link: 'https://www.amgen.sk/',
    //     isVirtualTent: true,
    //     name: 'amgen',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    //   },
    //   {
    //     src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/MSD_logo.png',
    //     link: 'https://www.msd.sk/',
    //     isVirtualTent: true,
    //     name: 'msd',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    //   },
    //   {
    //     src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Sandoz_logo.png',
    //     link: 'www.sandoz.sk',
    //     isVirtualTent: true,
    //     name: 'sandoz',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    //   },
    //   {
    //     src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Swixx_logo.png',
    //     link: 'http://www.swixxbiopharma.com/',
    //     isVirtualTent: false,
    //     name: 'swixx',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    //   },
    //   {
    //     src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/bristol_logo.jpeg',
    //     link: '',
    //     isVirtualTent: false,
    //     name: 'bristol',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    //   },
    //   {
    //     src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/takeda_logo.png',
    //     link: '',
    //     isVirtualTent: true,
    //     name: 'takeda',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    //   },
    //   {
    //     src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/teva_logo.png',
    //     link: 'https://www.onkoplo.cz/',
    //     isVirtualTent: true,
    //     name: 'teva',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    //   },
    //   {
    //     src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/woerwag_logo.jpeg',
    //     link: 'https://www.woerwagpharma.sk/sk',
    //     isVirtualTent: false,
    //     name: 'woerwag',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    //   },
    //   {
    //     src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/ZENTIVA_logo.png',
    //     link: 'https://www.zentiva.sk/',
    //     isVirtualTent: true,
    //     name: 'zentiva',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    //   },
  ];
  public partnersLogos: IPartner[] = [
    //   {
    //     src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/AstraZeneca_logo.jpeg',
    //     link: 'https://www.astrazeneca.sk/',
    //     isVirtualTent: true,
    //     name: 'astrazeneca',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    //   },
    //   {
    //     src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/glenmark_logo.png',
    //     link: 'https://www.glenmarkpharma.sk/',
    //     isVirtualTent: true,
    //     name: 'glenmark',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    //   },
    //   {
    //     src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Jansse_logo.png',
    //     link: 'https://www.janssen.com/slovakia/uvod',
    //     isVirtualTent: true,
    //     name: 'johnsonjohnson',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    //   },
    //   {
    //     src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/MERCK_logo.png',
    //     link: 'https://www.medimerck.sk/sk/home/rakovina.html',
    //     isVirtualTent: false,
    //     name: 'merck',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    //   },
    //   {
    //     src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Pfizer_logo.png',
    //     link: 'https://www.pfizer.sk/',
    //     isVirtualTent: false,
    //     name: 'pfizer',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    //   },
    // {
    //     src: 'assets/logos/zentiva-logo.png',
    //     link: 'https://www.zentiva.sk/',
    //     isVirtualTent: false,
    //     name: 'zentiva',
    //     hasVirtualTent: false,
    //     virtualTentLink: '',
    // },
  ];

  public exhibitorsLogos: IPartner[] = [
    // {
    //   src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/astellas_logo.png',
    //   link: 'https://www.astellas.com/sk/',
    //   isVirtualTent: false,
    //   name: 'astellas',
    //   hasVirtualTent: false,
    //   virtualTentLink: '',
    // },
    // {
    //   src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/BAYER_logo.png',
    //   link: 'https://www.bayer.com/en/sk/slovakia-home',
    //   isVirtualTent: false,
    //   name: 'bayer',
    //   hasVirtualTent: false,
    //   virtualTentLink: '',
    // },
    // {
    //   src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/EGIS_logo.jpeg',
    //   link: 'https://sk.egis.health/',
    //   isVirtualTent: false,
    //   name: 'egis',
    //   hasVirtualTent: false,
    //   virtualTentLink: '',
    // },
    // {
    //   src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/EliLilly_logo.jpg',
    //   link: 'https://www.lilly.com/sk/',
    //   isVirtualTent: false,
    //   name: 'eliLilly',
    //   hasVirtualTent: false,
    //   virtualTentLink: '',
    // },
    // {
    //   src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Ipsen_logo.jpeg',
    //   link: '',
    //   isVirtualTent: false,
    //   name: 'ipsen',
    //   hasVirtualTent: false,
    //   virtualTentLink: '',
    // },
    // {
    //   src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/KRKA_logo.jpg',
    //   link: 'https://www.krka.sk/?utm_source=levoca&utm_medium=web&utm_id=neukongres',
    //   isVirtualTent: false,
    //   name: 'krka',
    //   hasVirtualTent: false,
    //   virtualTentLink: '',
    // },
  ];
  public otherPartnersLogos: IPartner[] = [
    // {
    //   src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/BioconBiologics_logo.png',
    //   link: 'https://www.bioconbiologics.com/product-locator/slovakia/',
    //   isVirtualTent: false,
    //   name: 'biocon',
    //   hasVirtualTent: false,
    //   virtualTentLink: '',
    // },
    // {
    //   src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/neomedica_logo.png',
    //   link: 'https://www.neomedica.sk/',
    //   isVirtualTent: false,
    //   name: 'neomedica',
    //   hasVirtualTent: false,
    //   virtualTentLink: '',
    // },
    // {
    //   src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Pascoe_logo.png',
    //   link: 'https://www.pascoe.sk/',
    //   isVirtualTent: false,
    //   name: 'pascoe',
    //   hasVirtualTent: false,
    //   virtualTentLink: '',
    // },
    // {
    //   src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/Roche_logo.png',
    //   link: 'https://mojamedicina.sk/',
    //   isVirtualTent: false,
    //   name: 'roche',
    //   hasVirtualTent: false,
    //   virtualTentLink: '',
    // },
    // {
    //   src: 'https://summeet.fra1.cdn.digitaloceanspaces.com/public/partners/servier_logo.png',
    //   link: 'https://servier.sk/',
    //   isVirtualTent: false,
    //   name: 'servier',
    //   hasVirtualTent: false,
    //   virtualTentLink: '',
    // },
  ];
}
