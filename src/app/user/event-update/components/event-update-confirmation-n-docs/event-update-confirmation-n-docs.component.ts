import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IConfirmationNDocsTableData } from '../../interfaces/event-update.interface';

const ELEMENT_DATA: IConfirmationNDocsTableData[] = [
  {
    id: '1',
    name: 'Sablona prednasky',
    state: 'available',
    type: 'template',
  },
  {
    id: '2',
    name: 'Sablona posteru',
    state: 'available',
    type: 'template',
  },
  {
    id: '3',
    name: 'Registracny formular',
    state: 'in_progress',
    type: 'endorsment',
  },
  {
    id: '4',
    name: 'Potvrdenie o účasti',
    state: 'in_progress',
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
  selector: 'summeet-event-update-confirmation-n-docs',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './event-update-confirmation-n-docs.component.html',
  styleUrl: './event-update-confirmation-n-docs.component.scss',
})
export class EventUpdateConfirmationNDocsComponent {
  public displayedColumns: string[] = ['name', 'state', 'type', 'actions'];
  public dataSource = new MatTableDataSource<IConfirmationNDocsTableData>(
    ELEMENT_DATA,
  );
}
