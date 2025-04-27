import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

/**
 * Custom paginator labels
 */
@Injectable()
export class SlovakPaginatorIntl implements MatPaginatorIntl {
  public changes = new Subject<void>();

  // Slovak labels for the paginator
  public firstPageLabel = 'Prvá stránka';
  public itemsPerPageLabel = 'Položky na stránku:';
  public lastPageLabel = 'Posledná stránka';
  public nextPageLabel = 'Nasledujúca stránka';
  public previousPageLabel = 'Predchádzajúca stránka';

  /**
   * This method is called when the paginator is connected to a new data source. Use this method to reset the paginator to its initial state.
   * @param {number} page - The page number that the paginator should display
   * @param {number} pageSize - The number of items that the paginator should display on each page
   * @param {number} length - The total number of items that the data source can provide
   * @returns {string} - The range label
   */
  public getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return 'Stránka 1 z 1';
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Stránka ${page + 1} z ${amountPages}`;
  }
}
