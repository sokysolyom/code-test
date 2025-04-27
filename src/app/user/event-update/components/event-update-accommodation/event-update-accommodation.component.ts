import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, take, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DateTime } from 'luxon';
import { IAppState } from '@app/state/app.state';
import { NotificationService } from '@app/core/services/notification.service';
import { eventEditIdSelector } from '@app/state/event-edit/event-edit.selector';
import {
  DayFromDate,
  DayRangeFromDatePipe,
  MonthFromDate,
} from '@app/shared/pipes/birth-dates.pipe';
import { EventUpdateService } from '../../services/event-update.service';
import {
  IAccommodaitionVIewData,
  IMealsViewData,
} from '../../interfaces/event-update.interface';

/**
 * This component is used to update accommodation for the event
 */
@Component({
  selector: 'summeet-event-update-accommodation',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    DayRangeFromDatePipe,
    MonthFromDate,
    DayFromDate,
  ],
  templateUrl: './event-update-accommodation.component.html',
  styleUrl: './event-update-accommodation.component.scss',
})
export class EventUpdateAccommodationComponent implements OnInit {
  public accommodationSettings!: IAccommodaitionVIewData | null;
  public mealsSettings: IMealsViewData[] = [];

  private readonly eventUpdateService = inject(EventUpdateService);
  private readonly store = inject(Store<IAppState>);
  private readonly notificationService = inject(NotificationService);

  /**
   * This method is called when the component is initialized
   * @returns {void}
   */
  public ngOnInit(): void {
    this.store
      .select(eventEditIdSelector)
      .pipe(
        take(1),
        concatMap(eventId =>
          this.eventUpdateService.getUserAccommodation(eventId).pipe(
            map(response => {
              if (response.length === 0) {
                return { eventId, accommodation: null, allDays: false }; // Handle case where response is empty
              }

              const hotel = response[0].roomGroup.hotel.name;
              const preferredRoommate = response[0].preferredRoommate;
              const accommodationStartDate = new Date(
                response[0].roomGroup.hotel.accommodationStartDate,
              );
              const accommodationEndDate = new Date(
                response[0].roomGroup.hotel.accommodationEndDate,
              );

              // Calculate the number of days between start and end date
              const numberOfDays = Math.ceil(
                (accommodationEndDate.getTime() -
                  accommodationStartDate.getTime()) /
                  (1000 * 60 * 60 * 24),
              );

              // Map room groups with calculated day
              const roomGroups = response.map(item => ({
                date: item.roomGroup.date,
                retailPrice: item.roomGroup.retailPrice,
                isIncludedInRegistrationFee:
                  item.roomGroup.isIncludedInRegistrationFee,
                day:
                  Math.ceil(
                    (new Date(item.roomGroup.date).getTime() -
                      accommodationStartDate.getTime()) /
                      (1000 * 60 * 60 * 24),
                  ) + 1,
              }));

              // Determine if the array has the same or more items than the number of days
              const isAllDays = response.length >= numberOfDays;

              return {
                eventId,
                accommodation: {
                  hotel,
                  preferredRoommate,
                  roomGroups,
                  allDays: isAllDays,
                  startDate: accommodationStartDate.toISOString(),
                  endDate: accommodationEndDate.toISOString(),
                },
                hotelStartDate: accommodationStartDate.toISOString(),
              };
            }),
          ),
        ),
        tap(({ accommodation }) => {
          this.accommodationSettings = accommodation;
        }),
        concatMap(({ eventId, hotelStartDate }) =>
          this.eventUpdateService.getUserMeals(eventId).pipe(
            map(meals => {
              const startDate = hotelStartDate
                ? new Date(hotelStartDate)
                : new Date();
              const sortedMeals = meals
                .map(meal => ({
                  date: meal.meal.date,
                  name: meal.meal.name,
                  retailPrice: meal.meal.retailPrice,
                  isIncludedInAccommodationPrice:
                    meal.meal.isIncludedInAccommodationPrice,
                  isIncludedInRegistrationFee:
                    meal.meal.isIncludedInRegistrationFee,
                  day:
                    Math.ceil(
                      (new Date(meal.meal.date).getTime() -
                        startDate.getTime()) /
                        (1000 * 60 * 60 * 24),
                    ) + 1,
                }))
                .sort((a, b) => a.day - b.day); // Sorting meals by the day field in ascending order

              return sortedMeals;
            }),
          ),
        ),
        tap(mealData => {
          this.mealsSettings = mealData;
        }),
        catchError(err => {
          const errorResponse = err as HttpErrorResponse;

          const errorMessage =
            errorResponse.error &&
            typeof errorResponse.error === 'object' &&
            'message' in errorResponse.error
              ? (errorResponse.error as { message: string }).message
              : 'An unknown error occurred';

          this.notificationService.error(errorMessage);
          return throwError(() => new Error(errorMessage));
        }),
      )
      .subscribe();
  }

  /**
   * This method is used to check the meal price
   * @param {string} date - The date of the meal
   * @param {string} retailPrice - The retail price of the meal
   * @param {boolean} isIncludedInAccommodationPrice - The isIncludedInAccommodationPrice
   * @param {boolean} isIncludedInRegistrationFee - The isIncludedInRegistrationFee
   * @returns {number} - The price of the meal
   */
  public checkMealPrice(
    date: string,
    retailPrice: string,
    isIncludedInAccommodationPrice: boolean,
    isIncludedInRegistrationFee: boolean,
  ): number {
    const retailPriceNumber = Number(retailPrice);
    if (isIncludedInRegistrationFee) {
      return 0;
    }

    const mealDateTime = DateTime.fromISO(date);

    return this.accommodationSettings?.roomGroups.some(room => {
      const selectedRoomDate = DateTime.fromISO(room.date);

      return (
        selectedRoomDate.equals(mealDateTime) && isIncludedInAccommodationPrice
      );
    })
      ? 0
      : retailPriceNumber;
  }
}
