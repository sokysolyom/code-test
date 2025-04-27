import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  BehaviorSubject,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  concatMap,
  map,
  tap,
  takeUntil,
  catchError,
  throwError,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from '@app/core/services/utilities.service';
import {
  IZipCodeDto,
  IMedicType,
} from '@app/register/interfaces/register.type';
import { RegisterService } from '@app/register/services/register.service';
import { NotificationService } from '@app/core/services/notification.service';
import {
  IMedicalExpertise,
  IWorkDataPut,
  IWorkplaceStatements,
} from '../../interfaces/profile-personal-statements.interface';
import { ProfileService } from '../../services/profile.service';

/**
 *
 */
@Component({
  selector: 'summeet-profile-workplace-form',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './profile-workplace-form.component.html',
  styleUrl: './profile-workplace-form.component.scss',
})
export class ProfileWorkplaceFormComponent implements OnInit, AfterViewInit {
  public workplaceDataForm!: FormGroup<IWorkplaceStatements>;
  @ViewChild('workplaceZipCodeInputNative', { static: false })
  public workplaceZipCodeInputNative!: ElementRef<HTMLInputElement>;
  @ViewChild('workplaceZipCodeSuggestionsAuto', { static: false })
  public workplaceZipCodeSuggestionsAuto!: MatAutocomplete;
  public workplaceZipCodeSuggestions: IZipCodeDto[] = [];
  public ncziTypes!: IMedicType[];
  public doctorId!: string;
  public isMedicalExpertiseVisible$ = new BehaviorSubject<boolean>(false);
  public isSelectedMedicalExpertise!: boolean;
  public unknownMedicalExpertise!: IMedicalExpertise;
  public medicalExpertiseTypes: IMedicType[] = [];
  public medicalExptertiseSuggestions!: IMedicType[];
  public destroy$ = new Subject<void>();

  private readonly registerService = inject(RegisterService);
  private readonly utilitiesService = inject(UtilitiesService);
  private readonly profileService = inject(ProfileService);
  private readonly notificationService = inject(NotificationService);

  /**
   * This method is used to initialize the component.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.workplaceDataForm = new FormGroup<IWorkplaceStatements>({
      chamberId: new FormControl<string | null>('', Validators.required),
      workplaceFullName: new FormControl<string | null>(
        '',
        Validators.required,
      ),
      workplaceStreet: new FormControl<string | null>('', Validators.required),
      workplaceStreetNumber: new FormControl<string | null>(
        '',
        Validators.required,
      ),
      workplaceZipCode: new FormControl<string | null>('', Validators.required),
      medicTypeId: new FormControl<string | null>('', Validators.required),
      medicalExpertise: new FormControl<IMedicalExpertise | null>(
        null,
        Validators.required,
      ),
      canPrescribeMedication: new FormControl<boolean | null>(
        false,
        Validators.required,
      ),
    });

    this.workplaceDataForm
      .get('workplaceZipCode')!
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(value => typeof value === 'string'), // Only trigger suggestions on string input
        startWith(''),
        concatMap(value => this.registerService.getZipCodes(value)), // Call the backend for suggestions
        map(res => {
          this.workplaceZipCodeSuggestions = res;
        }),
      )
      .subscribe();

    this.registerService
      .getNCZI()
      .pipe(
        tap(res => {
          for (const me of res) {
            if (me.abbreviation === 'A01') {
              this.doctorId = me.id;
            }
          }
        }),
      )
      .subscribe(res => {
        this.ncziTypes = res;
      });
    // Get medical expertise types method
    this.registerService
      .getMedicalExpertise()
      .pipe(
        tap(res => {
          for (const me of res) {
            if (me.abbreviation === '444') {
              this.unknownMedicalExpertise = me;
            }
          }
        }),
        // Filter out the unknown medical expertise
        map(res => res.filter(me => me.abbreviation !== '444')),
        map(res => {
          this.medicalExpertiseTypes = res;
          this.medicalExptertiseSuggestions = res;
        }),
      )
      .subscribe();

    this.workplaceDataForm.get('medicTypeId')!.valueChanges.subscribe(value => {
      if (value === this.doctorId) {
        this.workplaceDataForm.get('medicalExpertise')!.setValue(null);
        this.isMedicalExpertiseVisible$.next(true);
      } else {
        this.workplaceDataForm.get('medicalExpertise')?.setErrors(null);
        this.isSelectedMedicalExpertise = true;
        this.workplaceDataForm
          .get('medicalExpertise')!
          .setValue(this.unknownMedicalExpertise);
        this.isMedicalExpertiseVisible$.next(false);
      }
    });

    this.isMedicalExpertiseVisible$
      .asObservable()
      .pipe(
        takeUntil(this.destroy$),
        filter(res => res), // Proceed only if the field is visible
        concatMap(
          () => this.workplaceDataForm.get('medicalExpertise')!.valueChanges,
        ),
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''),
        map(res => {
          // Check if the value is an object (i.e., the selected expertise object)
          if (typeof res === 'object' && res !== null) {
            // Reset the flag once an object is selected
            this.isSelectedMedicalExpertise = true;

            // Set the form control value to the selected object
            this.workplaceDataForm.get('medicalExpertise')?.setValue(res);
          } else {
            // Reset the flag if the user starts typing (indicating it's no longer an object selection)
            this.isSelectedMedicalExpertise = false;

            // Mark field as dirty if not selected properly
            this.workplaceDataForm
              .get('medicalExpertise')
              ?.setErrors({ isDirty: true });

            // Normalize the input to lowercase
            const value = res ? res.toLowerCase() : '';

            // Filter suggestions based on the value entered
            this.medicalExptertiseSuggestions = value
              ? this.medicalExpertiseTypes.filter(
                  me =>
                    me.name.toLowerCase().includes(value) ||
                    me.abbreviation.toLowerCase().includes(value),
                )
              : this.medicalExpertiseTypes; // Reset to full list if no input
          }
        }),
      )
      .subscribe();
  }

  // public displayFn(
  //   medicalExpertise: { id: string; abbreviation: string; name: string } | null,
  // ): string {
  //   return medicalExpertise
  //     ? `${medicalExpertise.abbreviation} ${medicalExpertise.name}`
  //     : '';
  // }

  /**
   * This method is used to destroy the component.
   * @returns {void}
   */
  public ngAfterViewInit(): void {
    this.profileService
      .workData()
      .pipe(
        map(data => {
          this.workplaceDataForm.patchValue({
            chamberId: data.chamberId,
            workplaceFullName: data.workplaceFullName,
            workplaceStreet: data.workplaceStreet,
            workplaceStreetNumber: data.workplaceStreetNumber,
            workplaceZipCode: data.workplaceZipCode,
            medicTypeId: data.medicType.id,
            canPrescribeMedication: data.canPrescribeMedications,
          });
          this.workplaceDataForm
            .get('medicalExpertise')!
            .patchValue(data.medicalExpertise);

          if (data.medicType.abbreviation === 'A01') {
            this.isMedicalExpertiseVisible$.next(true);
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
  }

  /**
   * This method is used to get the result from autocomplete.
   * @param {MatAutocompleteSelectedEvent} e - The event object.
   * @returns {void}
   */
  public onWorkplaceZipCodeSelected(e: MatAutocompleteSelectedEvent): void {
    const selectedZipCode = e.option.value as IZipCodeDto;
    const formattedZipCode =
      this.utilitiesService.zipCodeFormatter(selectedZipCode);

    // Update the form control's value and prevent emitting change events.
    this.workplaceDataForm
      .get('workplaceZipCode')!
      .setValue(formattedZipCode, { emitEvent: false });

    // Update the native input value to ensure it reflects the formatted value.
    this.workplaceZipCodeInputNative.nativeElement.value = formattedZipCode;
  }

  /**
   * Display function
   * @description Add titles before name
   * @param {IMedicType} option - option
   * @returns {string} - display function
   */
  public displayFn(option: IMedicType): string {
    return option ? `${option.abbreviation} ${option.name}` : '';
  }

  /**
   * This method is used to toggle the prescription.
   * @param {boolean} state - The state of the prescription.
   */
  public togglePrescription(state: boolean): void {
    this.workplaceDataForm.get('canPrescribeMedication')!.setValue(state);
  }

  /**
   * This method is used to submit the form.
   * @returns {void}
   */
  public onSubmit(): void {
    if (this.workplaceDataForm.valid) {
      // Submit the form
      const data: IWorkDataPut = {
        medicTypeId: this.workplaceDataForm.get('medicTypeId')!.value ?? '',
        medicalExpertiseId:
          this.workplaceDataForm.get('medicalExpertise')!.value?.id ?? '',
        chamberId: this.workplaceDataForm.get('chamberId')!.value ?? '',
        canPrescribeMedications:
          this.workplaceDataForm.get('canPrescribeMedication')!.value ?? false,
        workplaceFullName:
          this.workplaceDataForm.get('workplaceFullName')!.value ?? '',
        workplaceStreet:
          this.workplaceDataForm.get('workplaceStreet')!.value ?? '',
        workplaceStreetNumber:
          this.workplaceDataForm.get('workplaceStreetNumber')!.value ?? '',
        workplaceZipCode:
          this.workplaceDataForm.get('workplaceZipCode')!.value ?? '',
      };
      this.profileService
        .putWorkData(data)
        .pipe(
          map(() => {
            this.notificationService.success('Údaje o povolaní boli uložené');
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
  }
}
