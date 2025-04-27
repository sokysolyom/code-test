import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IConfirmationNDocsTableData } from '../../interfaces/event-detail.interface';

const ELEMENT_DATA: IConfirmationNDocsTableData[] = [
  {
    id: '3',
    name: 'Registracny formular',
    state: 'available',
    type: 'endorsment',
  },
  {
    id: '4',
    name: 'Potvrdenie o účasti',
    state: 'available',
    type: 'endorsment',
  },
  {
    id: '5',
    name: 'Licenčná zmluva',
    state: 'in_progress',
    type: 'contract',
  },
  {
    id: '6',
    name: 'Potvrdenie o peňažnom a nepeňažnom plnení',
    state: 'in_progress',
    type: 'endorsment',
  },
];
/**
 * This component is used to display the confirmation and documents for the event
 */
@Component({
  selector: 'summeet-event-detail-confirmation-n-docs',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './event-detail-confirmation-n-docs.component.html',
  styleUrl: './event-detail-confirmation-n-docs.component.scss',
})
export class EventDetailConfirmationNDocsComponent {
  public displayedColumns: string[] = ['name', 'state', 'type', 'actions'];
  public dataSource = new MatTableDataSource<IConfirmationNDocsTableData>(
    ELEMENT_DATA,
  );
}
