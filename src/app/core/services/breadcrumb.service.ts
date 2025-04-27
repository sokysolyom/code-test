import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Breadcrumb Service
 */
@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  // BehaviorSubject to store and emit breadcrumb changes
  private breadcrumbsSubject: BehaviorSubject<
    Array<{ label: string; url: string }>
  > = new BehaviorSubject<Array<{ label: string; url: string }>>([]);
  // Expose the breadcrumbs as an observable
  public breadcrumbs$: Observable<Array<{ label: string; url: string }>> =
    this.breadcrumbsSubject.asObservable();

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  /**
   * Constructor
   * @description Initialize service
   */
  private constructor() {
    // Generate breadcrumbs for the initial page load
    const initialBreadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    this.breadcrumbsSubject.next(initialBreadcrumbs);

    // Listen for navigation events and update breadcrumbs
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        this.breadcrumbsSubject.next(breadcrumbs); // Emit the new breadcrumb data
      });
  }

  //
  /**
   * Recursive method to create breadcrumbs
   * @description Create breadcrumbs
   * @param {ActivatedRoute} route - Route
   * @param {string} url - URL
   * @param {Array<{ label: string; url: string }>} breadcrumbs - Breadcrumbs
   * @returns {Array<{ label: string; url: string }>} - Breadcrumbs
   */
  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<{ label: string; url: string }> = [],
  ): Array<{ label: string; url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map(segment => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      // Check if 'breadcrumb' data is set to 'none'
      const breadcrumbLabel = child.snapshot.data['breadcrumb'];
      if (breadcrumbLabel && breadcrumbLabel !== 'none') {
        breadcrumbs.push({ label: breadcrumbLabel, url: url });
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
