import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WINDOW_REF } from '@app/core/utils/window-ref';
import { LayoutNavbarComponent } from '../layout-navbar/layout-navbar.component';
import { LayoutSidenavComponent } from '../layout-sidenav/layout-sidenav.component';
import { LayoutNoMobileComponent } from '../layout-no-mobile/layout-no-mobile.component';

/**
 * This component is used to display the layout overview
 */
@Component({
  selector: 'summeet-layout-overview',
  standalone: true,
  imports: [
    LayoutNavbarComponent,
    LayoutSidenavComponent,
    CommonModule,
    LayoutNoMobileComponent,
  ],
  templateUrl: './layout-overview.component.html',
  styleUrl: './layout-overview.component.scss',
})
export class LayoutOverviewComponent implements OnInit {
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
