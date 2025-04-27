import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { WINDOW_REF } from '@app/core/utils/window-ref';
import { NavbarComponent } from '../navbar/navbar.component';
import { MobileNavbarComponent } from '../mobile-navbar/mobile-navbar.component';

/**
 * This component is used to display the header.
 */
@Component({
  selector: 'summeet-header',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MobileNavbarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public screenWidth!: number;
  private readonly window = inject(WINDOW_REF);

  /**
   * This method is called when the window is resized.
   * @returns {void}
   */
  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.screenWidth = this.window.innerWidth;
  }

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.screenWidth = this.window.innerWidth;
  }
}
