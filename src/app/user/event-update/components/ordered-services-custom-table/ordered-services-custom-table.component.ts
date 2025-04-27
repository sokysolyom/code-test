import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Role } from '@app/shared/enums/role.enum';
import {
  MonthFromDate,
  DayFromDate,
  DayRangeFromDatePipe,
} from '@app/shared/pipes/birth-dates.pipe';
import { DayDifferencePipe } from '@app/shared/pipes/accommodation-dates.pipe';
import { IOrderedServicesTable } from '../../interfaces/ordered-services-custom-table.interface';

/**
 * Ordered Services Custom Table Component
 */
@Component({
  selector: 'summeet-ordered-services-custom-table',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    MatDividerModule,
    MonthFromDate,
    DayFromDate,
    DayRangeFromDatePipe,
    DayDifferencePipe,
  ],
  templateUrl: './ordered-services-custom-table.component.html',
  styleUrl: './ordered-services-custom-table.component.scss',
})
export class OrderedServicesCustomTableComponent {
  @Input() public userData!: IOrderedServicesTable;
  public healtcareRole = Role.HEALTHCARE_PROFESSIONAL;
}
