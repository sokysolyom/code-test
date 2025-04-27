import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  ElementRef,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { IAppState } from '@app/state/app.state';
import { accessTokenSelector } from '@app/state/auth/auth.selector';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';

/**
 * This component is responsible for displaying the program of the event
 * @author Softverse
 */
@Component({
  selector: 'summeet-program',
  standalone: true,
  imports: [TitleOverlayComponent, CommonModule],
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit, AfterViewInit {
  public isAuthed: boolean = false;
  private readonly store = inject(Store<IAppState>);
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);
  private readonly cdr = inject(ChangeDetectorRef);

  /**
   * This method is called when the component is initialized
   * @returns {void}
   */
  public ngOnInit(): void {
    this.store.select(accessTokenSelector).subscribe(isLoggedIn => {
      this.isAuthed = !!isLoggedIn; // Simplified to set isAuthed directly
    });
  }

  /**
   * This method is called after the view is initialized
   * @returns {void}
   */
  public ngAfterViewInit(): void {
    if (this.isAuthed) {
      this._loadPublitasScript();
    }
  }

  /**
   * This method loads the Publitas script
   * @returns {void}
   */
  private _loadPublitasScript(): void {
    const div = this.renderer.createElement('div');
    this.renderer.setAttribute(div, 'id', 'publitas-embed-ar3618nk74i');

    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'data-cfasync', 'false');
    this.renderer.setAttribute(script, 'data-height', 'undefined');
    this.renderer.setAttribute(
      script,
      'data-publication',
      'https://view.publitas.com/summeet-s-r-o/2024_05_29-bbod2024-program/',
    );
    this.renderer.setAttribute(
      script,
      'data-publication-aspect-ratio',
      '1.4092339979013642',
    );
    this.renderer.setAttribute(script, 'data-responsive', 'true');
    this.renderer.setAttribute(script, 'data-width', 'undefined');
    this.renderer.setAttribute(
      script,
      'data-wrapper-id',
      'publitas-embed-ar3618nk74i',
    );
    this.renderer.setAttribute(script, 'publitas-embed', '');
    this.renderer.setAttribute(
      script,
      'src',
      'https://view.publitas.com/embed.js',
    );
    this.renderer.setAttribute(script, 'type', 'text/javascript');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const container = this.el.nativeElement.querySelector(
      '.publitas-container',
    );
    if (container) {
      this.renderer.appendChild(container, div);
      this.renderer.appendChild(container, script);
      this.cdr.detectChanges();
    }
  }
}
