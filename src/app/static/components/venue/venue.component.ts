import { Component, ViewEncapsulation } from '@angular/core';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { IVenueData } from '@app/static/types/general.type';
import { VenueDataComponent } from '../venue-data/venue-data.component';

/**
 * This component is used to display the venue.
 */
@Component({
  selector: 'summeet-venue',
  standalone: true,
  imports: [TitleOverlayComponent, VenueDataComponent],
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VenueComponent {
  public venueData: IVenueData = {
    hotel: '<span>Aula Magna, Jesseniova lekárska fakulta UK v Martine</span>',
    addressCity: '<span><p>Malá hora 4/A, 036 01 Martin</p></span>',
    photos: [
      'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/venue/venue1.jpg',
      'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/venue/venue2.jpg',
      'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/venue/venue3.jpg',
    ],
    positionMap: {
      street: 'Malá hora',
      num: '4',
      city: 'Martin',
      zoom: 2,
    },
    iFrameUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6800.807050571039!2d18.930283!3d49.065277!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714fee1ab3f20d7%3A0xb53731f7fb24c681!2sJesseniova%20lek%C3%A1rska%20fakulta%20UK%20v%20Martine%20-%20Dekan%C3%A1t%20a%20Aula%20Magna!5e1!3m2!1ssk!2ssk!4v1737653524555!5m2!1ssk!2ssk',
    buttonLink:
      // eslint-disable-next-line quotes
      `https://www.google.com/maps/dir//Jesseniova+lekárska+fakulta+UK+v+Martine+-+Dekanát+a+Aula+Magna,+Malá+hora+4%2FA,+Martin,+036+01+Martin/@49.0652807,18.9277083,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x4714fee1ab3f20d7:0xb53731f7fb24c681!2m2!1d18.9302832!2d49.0652772?hl=sk&entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D`,
  };
}
