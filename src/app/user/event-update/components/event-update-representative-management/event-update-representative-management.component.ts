import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  filter,
  map,
  of,
  startWith,
  Subject,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { EventService } from '@app/user/event/services/event.service';
import { IPartnerSettings } from '@app/user/event/interfaces/event.interface';
import { EventRegisterService } from '@app/user/event-register/services/event-register.service';
import { IAppState } from '@app/state/app.state';
import { roleSelector } from '@app/state/auth/auth.selector';
import { Role } from '@app/shared/enums/role.enum';
import {
  eventEditIdSelector,
  eventEditSelect,
} from '@app/state/event-edit/event-edit.selector';
import { NotificationService } from '@app/core/services/notification.service';
import {
  postEventRegisterAccommodationSettings,
  postEventRegisterEvent,
} from '@app/state/event-register/event-register.actions';
import { IEventRegisterEventState } from '@app/state/event-register/event-register.reducer';
import { IOrderedServicesTable } from '../../interfaces/ordered-services-custom-table.interface';
import { OrderedServicesCustomTableComponent } from '../ordered-services-custom-table/ordered-services-custom-table.component';
import { IRegisteredUsersCustomTable } from '../../interfaces/registered-users-custom-table.interface';
import { RegisteredUsersCustomTableComponent } from '../registered-users-custom-table/registered-users-custom-table.component';
import { RepresentativeRegisterDialogComponent } from '../dialogs/representative-register-dialog/representative-register-dialog.component';
import { MedicalUserRegisterDialogComponent } from '../dialogs/medical-user-register-dialog/medical-user-register-dialog.component';
import { EventUpdateService } from '../../services/event-update.service';
import { VerifyEmailDialogComponent } from '../dialogs/verify-email-dialog/verify-email-dialog.component';
import { IVerifyEmailDialogResponse } from '../../interfaces/verify-email-dialog.interface';
import { MedicalUserRegisterEventDialogComponent } from '../dialogs/medical-user-register-event-dialog/medical-user-register-event-dialog.component';
import { RepresentativeRegisterEventDialogComponent } from '../dialogs/representative-register-event-dialog/representative-register-event-dialog.component';

/**
 * This component is responsible for displaying event update representative management
 */
@Component({
  selector: 'summeet-event-update-representative-management',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    RegisteredUsersCustomTableComponent,
    OrderedServicesCustomTableComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './event-update-representative-management.component.html',
  styleUrl: './event-update-representative-management.component.scss',
})
export class EventUpdateRepresentativeManagementComponent implements OnInit {
  public healthcareProfessionals!: IRegisteredUsersCustomTable;
  public representatives!: IRegisteredUsersCustomTable;
  public healthcareProfessionalOrders!: IOrderedServicesTable;
  public representativeOrders!: IOrderedServicesTable;
  public isSelectVisible$: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );
  public isSubject: boolean = false;
  public isDataLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public fetchSettings$ = new Subject<void>();
  public partner: FormControl<string | null> = new FormControl<string | null>(
    null,
  );
  public legalPersonId: string = '';
  public allPartners: IPartnerSettings[] = [];
  public isRegistered: boolean = false;
  public isAdminSelectVisible: boolean = false;
  public adminState: number = 0;
  public isButtonDisabled: boolean = true;
  public isBulkRegistrationAllowed: boolean = false;
  private eventId!: string;
  public hasAccommodation: boolean = false;

  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store<IAppState>);
  private readonly eventService = inject(EventService);
  private readonly eventUpdateService = inject(EventUpdateService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly eventRegisterService = inject(EventRegisterService);
  private readonly route = inject(ActivatedRoute);

  /**
   * This method is called when the component is loaded
   */
  public ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.eventId = params.get('id') ?? '';
    });

    this.store
      .select(roleSelector)
      .pipe(
        take(1),
        tap(role => {
          if (role === Role.SUBJECT) {
            this.isSelectVisible$.next(true);
            this.isSubject = true;
          }
        }),
      )
      .subscribe();

    this.store
      .select(eventEditSelect)
      .pipe(
        take(1),
        concatMap(event =>
          this.eventService.settingsPartners(event.id).pipe(
            take(1),
            tap(data => {
              this.allPartners = data;

              let selectedPartner;

              if (event.partnerId) {
                // Use the event's partnerId if it's not null
                selectedPartner = data.find(
                  partner => partner.id === event.partnerId,
                );
              }

              if (!selectedPartner) {
                // Find the first partner where externalSubjectAdministrator is not null
                selectedPartner =
                  data.find(
                    partner => partner.externalSubjectAdministrator !== null,
                  ) || data[0];
              }

              if (selectedPartner) {
                this.partner.setValue(selectedPartner.id);
                this.legalPersonId = selectedPartner.legalPerson.id;
                this.fetchSettings();
              }
            }),
            map(data => ({
              eventId: event.id,
              hasValidPartner: data.some(
                partner => partner.externalSubjectAdministrator !== null,
              ),
            })),
          ),
        ),
        concatMap(({ eventId, hasValidPartner }) =>
          hasValidPartner
            ? this.eventUpdateService.iAmRegistered(eventId)
            : of(null),
        ),
        tap(isRegistered => {
          if (isRegistered !== null) {
            this.isRegistered = isRegistered;
          }
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

    this.isSelectVisible$
      .asObservable()
      .pipe(
        filter(res => res),
        concatMap(() => this.partner.valueChanges),
        tap(selectedPartnerId => {
          const selectedPartner = this.allPartners.find(
            partner => partner.id === selectedPartnerId,
          );

          if (
            selectedPartner &&
            selectedPartner.externalSubjectAdministrator !== null
          ) {
            this.fetchSettings();
          } else {
            this.isAdminSelectVisible = true;
          }
        }),
      )
      .subscribe();
  }

  /**
   *
   */
  public beExtAdminOfPartner(): void {
    if (this.adminState === 1) {
      this.eventRegisterService
        .assignAdministrator(this.eventId, this.partner.value ?? '')
        .pipe(
          tap(() => {
            this.notificationService.success(
              'Úspešne ste sa stali administrátorom.',
            );
            this.fetchSettings();
            this.isAdminSelectVisible = false;
          }),
        )
        .subscribe();
    } else {
      this.store
        .select(eventEditSelect)
        .pipe(
          take(1),
          map(event => {
            let selectedPartner;

            if (event.partnerId) {
              // Use the event's partnerId if it's not null
              selectedPartner = this.allPartners.find(
                partner => partner.id === event.partnerId,
              );
            }

            if (!selectedPartner) {
              // Find the first partner where externalSubjectAdministrator is not null
              selectedPartner =
                this.allPartners.find(
                  partner => partner.externalSubjectAdministrator !== null,
                ) || this.allPartners[0];
            }

            if (selectedPartner) {
              this.partner.setValue(selectedPartner.id);
              this.legalPersonId = selectedPartner.legalPerson.id;
              this.fetchSettings();
              this.isAdminSelectVisible = false;
            } else {
              this.notificationService.info(
                'Nestali ste sa administrátorom žiadneho partnera.',
              );
              void this.router.navigate(['/user/event/upcoming']);
            }
          }),
        )
        .subscribe();
    }
  }

  /**
   * This method is used to fetch settings
   * @returns {void}
   */
  public fetchSettings(): void {
    this.fetchSettings$
      .asObservable()
      .pipe(
        startWith([]),
        concatMap(() => this.store.select(eventEditIdSelector).pipe(take(1))),
        concatMap(eventId =>
          this.eventUpdateService.partnersSettings(
            eventId,
            this.partner.value ?? '',
          ),
        ),
        map(res => {
          this.hasAccommodation =
            res.partnerMeals.length > 0 || res.partnerRoomGroups.length > 0
              ? true
              : false;
          this.isBulkRegistrationAllowed = res.isBulkRegistrationAllowed;
          this.healthcareProfessionals = {
            role: Role.HEALTHCARE_PROFESSIONAL,
            users: res.healthcareProfessionals.map(hcp => ({
              ...hcp,
              accommodation: [], // Add default empty array
              meals: [], // Add default empty array
            })),
          };
          this.representatives = {
            role: Role.PARTNER,
            users: res.representatives.map(subject => ({
              ...subject,
              accommodation: [], // Add default empty array
              meals: [], // Add default empty array
            })),
          };
          this.healthcareProfessionalOrders = {
            role: Role.HEALTHCARE_PROFESSIONAL,
            orderedNumber: res.numberOfHealthcareProfessionals,
            registeredNumber: res.healthcareProfessionals.length,
            isBulkRegistrationAllowed: res.isBulkRegistrationAllowed,
            accommodation: res.partnerRoomGroups
              .filter(prg =>
                prg.roomGroup.categories.some(
                  category =>
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                    category.participantType === Role.HEALTHCARE_PROFESSIONAL,
                ),
              )
              .map(prg => ({
                id: prg.id,
                preferredRoommate: '', // Default value or dynamically assign if available
                orderedNumber: prg.numberAssigned,
                registeredNumber: prg.numberBooked,
                roomGroup: {
                  id: prg.roomGroup.id,
                  name: prg.roomGroup.name,
                  date: prg.roomGroup.date,
                  retailPrice: '0', // Default or dynamically assign
                  isIncludedInRegistrationFee: false, // Default or dynamically assign
                  hotel: {
                    id: prg.roomGroup.id, // Use same ID as roomGroup
                    name: prg.roomGroup.hotelName,
                    accommodationStartDate: prg.roomGroup.date, // Adjust based on data
                    accommodationEndDate: prg.roomGroup.date, // Adjust based on data
                  },
                },
              }))
              .sort(
                (a, b) =>
                  new Date(a.roomGroup.date).getTime() -
                  new Date(b.roomGroup.date).getTime(),
              ),
            meals: res.partnerMeals
              .filter(pm =>
                pm.meal.categories.some(
                  category =>
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                    category.participantType === Role.HEALTHCARE_PROFESSIONAL,
                ),
              )
              .map(pm => ({
                id: pm.id,
                orderedNumber: pm.numberAssigned,
                registeredNumber: pm.numberBooked,
                meal: {
                  id: pm.meal.id,
                  name: pm.meal.name,
                  date: pm.meal.date,
                  retailPrice: '0', // Default or dynamically assign
                  isIncludedInRegistrationFee: false, // Default or dynamically assign
                  isIncludedInAccommodationPrice: false, // Default or dynamically assign
                  hotel: {
                    id: pm.meal.id, // Use same ID as meal
                    name: pm.meal.hotelName,
                    accommodationStartDate: pm.meal.date, // Adjust based on data
                    accommodationEndDate: pm.meal.date, // Adjust based on data
                  },
                },
              }))
              .sort(
                (a, b) =>
                  new Date(a.meal.date).getTime() -
                  new Date(b.meal.date).getTime(),
              ),
          };
          this.representativeOrders = {
            role: Role.PARTNER,
            orderedNumber: res.numberOfRepresentatives,
            registeredNumber: res.representatives.length,
            accommodation: res.partnerRoomGroups
              .filter(prg =>
                prg.roomGroup.categories.some(
                  category =>
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                    category.participantType === Role.PARTNER,
                ),
              )
              .map(prg => ({
                id: prg.id,
                preferredRoommate: '', // Default value or dynamically assign if available
                orderedNumber: prg.numberAssigned,
                registeredNumber: prg.numberBooked,
                roomGroup: {
                  id: prg.roomGroup.id,
                  name: prg.roomGroup.name,
                  date: prg.roomGroup.date,
                  retailPrice: '0', // Default or dynamically assign
                  isIncludedInRegistrationFee: false, // Default or dynamically assign
                  hotel: {
                    id: prg.roomGroup.id, // Use same ID as roomGroup
                    name: prg.roomGroup.hotelName,
                    accommodationStartDate: prg.roomGroup.date, // Adjust based on data
                    accommodationEndDate: prg.roomGroup.date, // Adjust based on data
                  },
                },
              })),
            meals: res.partnerMeals
              .filter(pm =>
                pm.meal.categories.some(
                  category =>
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                    category.participantType === Role.PARTNER,
                ),
              )
              .map(pm => ({
                id: pm.id,
                orderedNumber: pm.numberAssigned,
                registeredNumber: pm.numberBooked,
                meal: {
                  id: pm.meal.id,
                  name: pm.meal.name,
                  date: pm.meal.date,
                  retailPrice: '0', // Default or dynamically assign
                  isIncludedInRegistrationFee: false, // Default or dynamically assign
                  isIncludedInAccommodationPrice: false, // Default or dynamically assign
                  hotel: {
                    id: pm.meal.id, // Use same ID as meal
                    name: pm.meal.hotelName,
                    accommodationStartDate: pm.meal.date, // Adjust based on data
                    accommodationEndDate: pm.meal.date, // Adjust based on data
                  },
                },
              })),
          };
        }),
        tap(() => {
          this.isDataLoaded$.next(true);
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
   * Toggle admin
   * @param {number} state - state
   * @returns {void}
   */
  public toggleAdmin(state: number): void {
    this.adminState = state;
    this.isButtonDisabled = false;
  }

  /**
   * This method is used to fetch the user data.
   * @returns {void}
   */
  public fetchDataAfterDelete(): void {
    this.fetchSettings$.next();
  }

  /**
   * Open medical professional dialog
   * @returns {void}
   */
  public openMedicalProfessionalDialog(): void {
    const verifyEmailDialogref = this.dialog.open(VerifyEmailDialogComponent, {
      width: '90%',
      maxWidth: '800px',
      data: true,
    });

    verifyEmailDialogref
      .afterClosed()
      .pipe(
        take(1),
        filter((res): res is IVerifyEmailDialogResponse => res !== null),
        tap(res => {
          if (res.isRegistered) {
            const medicalEventDialogRef = this.dialog.open(
              MedicalUserRegisterEventDialogComponent,
              {
                width: '90%',
                maxWidth: '800px',
                data: {
                  userId: res.authId,
                  legalPersonId: this.getLegalPersonId(),
                },
              },
            );

            medicalEventDialogRef
              .afterClosed()
              .pipe(
                take(1),
                filter((res): res is boolean => res !== null),
                tap(() => this.fetchSettings$.next()),
              )
              .subscribe();
          } else {
            const medicalUserRegisterDialogRef = this.dialog.open(
              MedicalUserRegisterDialogComponent,
              {
                width: '90%',
                maxWidth: '800px',
                data: res.email,
              },
            );

            medicalUserRegisterDialogRef
              .afterClosed()
              .pipe(
                take(1),
                filter((userId): userId is string => userId !== null),
                tap(userId => {
                  const medicalEventDialogRef = this.dialog.open(
                    MedicalUserRegisterEventDialogComponent,
                    {
                      width: '90%',
                      maxWidth: '800px',
                      data: {
                        userId: userId,
                        legalPersonId: this.getLegalPersonId(),
                      },
                    },
                  );
                  medicalEventDialogRef
                    .afterClosed()
                    .pipe(
                      take(1),
                      filter((res): res is boolean => res !== null),
                      tap(() => this.fetchSettings$.next()),
                    )
                    .subscribe();
                }),
              )
              .subscribe();
          }
        }),
      )
      .subscribe();
  }

  /**
   * Get legal person id from id
   * @returns {string} - The legal person id
   */
  private getLegalPersonId(): string {
    return (
      this.allPartners.find(partner => partner.id === this.partner.value)
        ?.legalPerson.id ?? ''
    );
  }

  /**
   * Open representative dialog
   * @returns {void}
   */
  public openRepresentativeDialog(): void {
    const verifyEmailDialogref = this.dialog.open(VerifyEmailDialogComponent, {
      width: '90%',
      maxWidth: '800px',
      data: false,
    });

    verifyEmailDialogref
      .afterClosed()
      .pipe(
        take(1),
        filter((res): res is IVerifyEmailDialogResponse => res !== null),
        tap(res => {
          if (res.isRegistered) {
            const representativeEventDialogRef = this.dialog.open(
              RepresentativeRegisterEventDialogComponent,
              {
                width: '90%',
                maxWidth: '800px',
                data: {
                  userId: res.authId,
                  legalPersonId: this.getLegalPersonId(),
                },
              },
            );
            representativeEventDialogRef
              .afterClosed()
              .pipe(
                take(1),
                filter((res): res is boolean => res !== null),
                tap(() => this.fetchSettings$.next()),
              )
              .subscribe();
          } else {
            const representativeDialogRef = this.dialog.open(
              RepresentativeRegisterDialogComponent,
              {
                width: '90%',
                maxWidth: '800px',
                data: {
                  email: res.email,
                  legalPersonId: this.getLegalPersonId(),
                },
              },
            );

            representativeDialogRef
              .afterClosed()
              .pipe(
                take(1),
                filter((userId): userId is string => userId !== null),
                tap(userId => {
                  const representativeEventDialogRef = this.dialog.open(
                    RepresentativeRegisterEventDialogComponent,
                    {
                      width: '90%',
                      maxWidth: '800px',
                      data: {
                        userId: userId,
                        legalPersonId: this.getLegalPersonId(),
                      },
                    },
                  );

                  representativeEventDialogRef
                    .afterClosed()
                    .pipe(
                      take(1),
                      filter((res): res is boolean => res !== null),
                      tap(() => this.fetchSettings$.next()),
                    )
                    .subscribe();
                }),
              )
              .subscribe();
          }
        }),
      )
      .subscribe();
  }

  /**
   * This method redirects the user to the regisration site
   * @returns {void}
   */
  public goToRegistration(): void {
    this.store
      .select(roleSelector)
      .pipe(
        take(1),
        switchMap(role =>
          this.store.select(eventEditSelect).pipe(
            take(1),
            tap(event => {
              // Prepare the content for dispatch
              const content: IEventRegisterEventState = {
                id: event.id,
                name: event.name,
              };

              // Add legalPersonId based on the role
              if (role === Role.PARTNER && this.allPartners.length > 0) {
                content.legalPersonId = this.allPartners[0].legalPerson.id;
              } else if (role === Role.SUBJECT && this.partner.value) {
                content.legalPersonId = this.getLegalPersonId();
              }

              // Dispatch the event registration action
              this.store.dispatch(
                postEventRegisterEvent({
                  content,
                }),
              );
            }),
          ),
        ),
        tap(event => {
          this.store.dispatch(
            postEventRegisterAccommodationSettings({
              content: {
                hasAccommodation: this.hasAccommodation,
              },
            }),
          );
          void this.router.navigate([
            `/user/event/event-register/${event.id}/payer`,
          ]);
        }),
      )
      .subscribe();
  }
}
