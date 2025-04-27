import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { IParkingData } from '@app/static/types/general.type';

/**
 * This component is used to display the parking page.
 */
@Component({
  selector: 'summeet-parking',
  standalone: true,
  imports: [
    TitleOverlayComponent,
    MatIconModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ParkingComponent {
  public parkingData: IParkingData[] = [
    {
      title: 'Aula Magna',
      hotelParkingTitle: 'Verejné parkovanie',
      hotelParking:
        '<span>Parkovať je možné na verejných parkovacích miestach v okolí Aula Magna a Edukačného centra. Parkovanie je spoplatnené sumou 1 EUR/hodina.</span>',
      // eslint-disable-next-line quotes
      imageRedirect: `https://www.google.com/maps/dir//Jesseniova+lek%C3%A1rska+fakulta+UK+v+Martine+-+Dekan%C3%A1t+a+Aula+Magna,+Mal%C3%A1+hora+4%2FA,+Martin,+036+01+Martin/@49.0652807,18.9277083,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x4714fee1ab3f20d7:0xb53731f7fb24c681!2m2!1d18.9302832!2d49.0652772?hl=sk&entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D`,
      imageUrl:
        'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/parking1.jpeg',
    },
    {
      title: 'Hotel Turiec',
      hotelParkingTitle: 'Parkovanie pre ubytovaných',
      hotelParking:
        '<span>Parkovať je možné na hotelovom parkovisku. Hostia hotela majú parkovanie bezplatné. </span>',
      // eslint-disable-next-line quotes
      imageRedirect: `https://maps.app.goo.gl/NhQXtcYhtrFph27Y8`,
      imageUrl:
        'https://summeet-bucket.fra1.cdn.digitaloceanspaces.com/sckht/public/parking2.jpeg',
    },
  ];

  /**
   * This method is used to navigate to the image redirect.
   * @param {number} idx - The index of the parking data.
   * @returns {void}
   */
  public navigate(idx: number): void {
    window.open(this.parkingData[`${idx}`].imageRedirect, '_blank');
  }
}
