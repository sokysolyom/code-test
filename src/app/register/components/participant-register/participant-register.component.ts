import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import {
  tap,
  debounceTime,
  distinctUntilChanged,
  map,
  concatMap,
  take,
  startWith,
  catchError,
  throwError,
  Observable,
  BehaviorSubject,
  filter,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { postAuthCredentials } from '@app/state/auth/auth.action';
import { IAppState } from '@app/state/app.state';
import { RegisterService } from '@app/register/services/register.service';
import {
  IAgreementFormControl,
  IPasswordFormControl,
  IPersonalDataFormControl,
  IWorkDataFormControl,
} from '@app/register/interfaces/register-form.type';
import {
  IMedicType,
  IParticipantRegisterData,
  ITitleName,
  IZipCodeDto,
} from '@app/register/interfaces/register.type';
import { WINDOW_REF } from '@app/core/utils/window-ref';
import { NotificationService } from '@app/core/services/notification.service';
import { equalityValidator } from '@app/core/utils/validators/equality.validator';
import { Sex } from '@app/shared/enums/sex.enum';
import { ISelectOption } from '@app/user/event-update/interfaces/event-update.interface';
import { UtilitiesService } from '@app/core/services/utilities.service';

const zipCodeFormatter = (zip: IZipCodeDto): string =>
  zip ? `${zip?.zipCode}, ${zip?.name}` : '';
const medicalExpertiseFormatter = (type: IMedicType): string =>
  type ? `${type?.abbreviation} ${type?.name}` : '';
/**
 * This component is used to display the participant registration page.
 */
@Component({
  selector: 'summeet-participant-register',
  standalone: true,
  imports: [
    TitleOverlayComponent,
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatDatepickerModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
  ],
  templateUrl: './participant-register.component.html',
  styleUrls: ['./participant-register.component.scss'],
  providers: [provideNativeDateAdapter()],
})
export class ParticipantRegisterComponent implements OnInit {
  // Stepper
  @ViewChild('stepper')
  private myStepper!: MatStepper;
  // Zipcode
  @ViewChild('workplaceZipCodeInputNative', { static: false })
  public workplaceZipCodeInputNative!: ElementRef<HTMLInputElement>;
  @ViewChild('workplaceZipCodeSuggestionsAuto', { static: false })
  public workplaceZipCodeSuggestionsAuto!: MatAutocomplete;
  @ViewChild('zipCodeInputNative', { static: false })
  public zipCodeInputNative!: ElementRef<HTMLInputElement>;
  @ViewChild('zipCodeSuggestionsAuto', { static: false })
  public zipCodeSuggestionsAuto!: MatAutocomplete;
  @ViewChild('medicalExpertiseInputNative', { static: false })
  public medicalExpertiseInputNative!: ElementRef<HTMLInputElement>;
  @ViewChild('medicalExpertiseAuto', { static: false })
  public medicalExpertiseAuto!: MatAutocomplete;
  public workplaceZipCodeSuggestions: IZipCodeDto[] = [];
  public zipCodeSuggestions: IZipCodeDto[] = [];
  public selectedWorkplaceZipCode!: IZipCodeDto;
  public selectedZipCode!: IZipCodeDto;
  // FormGroups
  public personalDataForm!: FormGroup<IPersonalDataFormControl>;
  public workDataForm!: FormGroup<IWorkDataFormControl>;
  public agreementForm!: FormGroup<IAgreementFormControl>;
  public passwordForm!: FormGroup<IPasswordFormControl>;
  // FormControls
  public titlesBeforeNameControl = new FormControl<string[]>([]);
  public titlesAfterNameControl = new FormControl<string[]>([]);
  public email: FormControl<string | null> = new FormControl<string | null>(
    '',
    Validators.compose([Validators.required, Validators.email]),
  );
  // Variables
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;
  public titlesBeforeNameOptions!: ITitleName[];
  public titlesAfterNameOptions!: ITitleName[];
  public ncziTypes!: IMedicType[];
  public medicalExpertiseTypes: IMedicType[] = [];
  public medicalExptertiseSuggestions!: IMedicType[];
  public isMedicalExpertiseVisible$: BehaviorSubject<boolean> =
    new BehaviorSubject(false);
  public activeButton: number | null = null;
  public isLinear: boolean = false;
  public filteredOptions!: Observable<IMedicType[]>;
  public unknownMedicalExpertiseId!: string;
  public doctorId!: string;
  public isSelectedMedicalExpertise: boolean = false;
  public genders: ISelectOption[] = [
    { value: Sex.MAN, viewValue: 'Muž' },
    { value: Sex.WOMAN, viewValue: 'Žena' },
  ];
  public startDate = new Date(
    new Date().getFullYear() - 18,
    new Date().getMonth(),
    new Date().getDate(),
  );

  /**
   * This method is called when the component is initialized.
   * @param {object} event - The event object.
   * @param {object} event.target - The target object.
   * @param {number} event.target.innerWidth - The inner width.
   * @returns {void}
   */
  @HostListener('window:resize', ['$event'])
  public onResize(event: { target: { innerWidth: number } }): void {
    this.isLinear = event.target.innerWidth <= 599;
  }

  private readonly registerService = inject(RegisterService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly store = inject(Store<IAppState>);
  private readonly window = inject(WINDOW_REF);
  private readonly utilitiesService = inject(UtilitiesService);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.passwordForm = new FormGroup<IPasswordFormControl>(
      {
        password: new FormControl<string | null>(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              String.raw`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$`,
            ),
          ]),
        ),
        confirmPassword: new FormControl<string | null>(
          '',
          Validators.required,
        ),
      },
      {
        updateOn: 'change',
        validators: equalityValidator('password', 'confirmPassword'),
      },
    );
    this.personalDataForm = new FormGroup<IPersonalDataFormControl>(
      {
        firstName: new FormControl<string | null>('', Validators.required),
        lastName: new FormControl<string | null>('', Validators.required),
        telephone: new FormControl<string | null>('', [
          Validators.required,
          Validators.pattern('[0-9,+ ]{10,13}'),
        ]),
        dateOfBirth: new FormControl<string | null>('', Validators.required),
        gender: new FormControl<string | null>('', Validators.required),
        street: new FormControl<string | null>('', Validators.required),
        streetNumber: new FormControl<string | null>('', Validators.required),
        zipCode: new FormControl<string | null>('', Validators.required),
      },
      { updateOn: 'change' },
    );

    this.workDataForm = new FormGroup<IWorkDataFormControl>(
      {
        chamberId: new FormControl<string | null>('', Validators.required),
        workplaceFullName: new FormControl<string | null>(
          '',
          Validators.compose([Validators.required, Validators.minLength(10)]),
        ),
        workplaceStreet: new FormControl<string | null>(
          '',
          Validators.required,
        ),
        workplaceStreetNumber: new FormControl<string | null>(
          '',
          Validators.required,
        ),
        workplaceZipCode: new FormControl<string | null>(
          '',
          Validators.required,
        ),
        medicTypeId: new FormControl<string | null>('', Validators.required),
        medicalExpertise: new FormControl<string | null>(
          '',
          Validators.required,
        ),
      },
      { updateOn: 'change' },
    );

    this.agreementForm = new FormGroup<IAgreementFormControl>({
      acreditedInformationAgreement: new FormControl<boolean | null>(false),
      realDataAgreement: new FormControl<boolean | null>(
        false,
        Validators.requiredTrue,
      ),
      personalDataAgreement: new FormControl<boolean | null>(
        false,
        Validators.requiredTrue,
      ),
      termsAgreement: new FormControl<boolean | null>(
        false,
        Validators.requiredTrue,
      ),
      newsletterAgreement: new FormControl<boolean | null>(false),
    });
    // Get titles before name method
    this.registerService.getTitlesBeforeName().subscribe(res => {
      this.titlesBeforeNameOptions = res;
    });
    // Get titles after name method
    this.registerService.getTitlesAfterName().subscribe(res => {
      this.titlesAfterNameOptions = res;
    });
    // Get NCZI types method
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
              this.unknownMedicalExpertiseId = me.id;
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
    // If users text into the input, it calls the BE for suggestions
    this.workDataForm
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
    // If users text into the input, it calls the BE for suggestions
    this.personalDataForm
      .get('zipCode')!
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(value => typeof value === 'string'), // Only trigger suggestions on string input
        startWith(''),
        concatMap(value => this.registerService.getZipCodes(value)), // Call the backend for suggestions
        map(res => {
          this.zipCodeSuggestions = res;
        }),
      )
      .subscribe();
    // If user text into the input, give him recommendations
    this.isMedicalExpertiseVisible$
      .asObservable()
      .pipe(
        filter(res => res), // Proceed only if the field is visible
        concatMap(
          () => this.workDataForm.get('medicalExpertise')!.valueChanges,
        ),
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''), // Initial state
        map(res => {
          const value = res?.toLowerCase() ?? '';

          if (!this.isSelectedMedicalExpertise) {
            // Mark field as dirty if not selected properly
            this.workDataForm
              .get('medicalExpertise')
              ?.setErrors({ isDirty: true });
          }

          // Filter suggestions
          this.medicalExptertiseSuggestions = value
            ? this.medicalExpertiseTypes.filter(
                me =>
                  me.name.toLowerCase().includes(value) ||
                  me.abbreviation.toLowerCase().includes(value),
              )
            : this.medicalExpertiseTypes;
        }),
      )
      .subscribe();

    this.workDataForm.get('medicTypeId')!.valueChanges.subscribe(value => {
      if (value === this.doctorId) {
        // Clear medical expertise and show field
        this.workDataForm.get('medicalExpertise')!.setValue(null);
        this.isMedicalExpertiseVisible$.next(true);
        this.isSelectedMedicalExpertise = false; // Reset the selected flag
      } else {
        // Hide the field and prefill with unknownMedicalExpertiseId
        this.workDataForm.get('medicalExpertise')?.setErrors(null);
        this.workDataForm
          .get('medicalExpertise')!
          .setValue(this.unknownMedicalExpertiseId);
        this.isSelectedMedicalExpertise = true;
        this.isMedicalExpertiseVisible$.next(false);
      }
    });
  }

  /**
   * This method is used to get the result from autocomplete.
   * @param {MatAutocompleteSelectedEvent} e - The event object.
   * @returns {void}
   */
  public onMedicalExpertiseSelected(e: MatAutocompleteSelectedEvent): void {
    const selectedMedicalExpertise = e.option.value as IMedicType;
    this.workDataForm.get('medicalExpertise')?.setErrors(null);
    this.isSelectedMedicalExpertise = true;
    const formatedMedicalExpertise = medicalExpertiseFormatter(
      selectedMedicalExpertise,
    );
    this.medicalExpertiseInputNative.nativeElement.value =
      formatedMedicalExpertise;
    this.workDataForm
      .get('medicalExpertise')!
      .setValue(selectedMedicalExpertise.id, { emitModelToViewChange: false });
  }
  /**
   * This method is used to get the result from autocomplete.
   * @param {MatAutocompleteSelectedEvent} e - The event object.
   * @returns {void}
   */
  public onWorkplaceZipCodeSelected(e: MatAutocompleteSelectedEvent): void {
    const selectedZipCode = e.option.value as IZipCodeDto;
    const formatedZipCode = zipCodeFormatter(selectedZipCode);
    this.workplaceZipCodeInputNative.nativeElement.value = formatedZipCode;
    this.workDataForm
      .get('workplaceZipCode')!
      .setValue(formatedZipCode, { emitModelToViewChange: false });
  }
  /**
   * This method is used to get the result from autocomplete.
   * @param {MatAutocompleteSelectedEvent} e - The event object.
   * @returns {void}
   */
  public onZipCodeSelected(e: MatAutocompleteSelectedEvent): void {
    const selectedZipCode = e.option.value as IZipCodeDto;
    const formatedZipCode = zipCodeFormatter(selectedZipCode);
    this.zipCodeInputNative.nativeElement.value = formatedZipCode;
    this.personalDataForm
      .get('zipCode')!
      .setValue(formatedZipCode, { emitModelToViewChange: false });
  }
  /**
   * This method is used to display the medical expertise.
   * @param {IMedicType} value - The value.
   * @returns {string} - The formatted medical expertise.
   */
  public displaySelectedMedicalExpertise(value: IMedicType): string {
    return medicalExpertiseFormatter(value);
  }
  /**
   * This method is used to display the selected workplace zip code.
   * @param {IZipCodeDto} value - The value.
   * @returns {string} - The formatted workplace zip code.
   */
  public displaySelectedWorkplaceZipCode(value: IZipCodeDto): string {
    return zipCodeFormatter(value);
  }
  //Display the ZipCode in correct form
  /**
   * This method is used to display the selected zip code.
   * @param {IZipCodeDto} value - The value.
   * @returns {string} - The formatted zip code.
   */
  public displaySelectedZipCode(value: IZipCodeDto): string {
    return zipCodeFormatter(value);
  }
  /**
   * This method is used to check the email.
   * @returns {void}
   */
  public checkEmail(): void {
    this.registerService
      .checkEmail(this.email.value!)
      .pipe(
        tap(() => this.myStepper.next()),
        catchError(err => {
          const errorResponse = err as HttpErrorResponse;

          const errorMessage =
            errorResponse.error &&
            typeof errorResponse.error === 'object' &&
            'message' in errorResponse.error
              ? (errorResponse.error as { message: string }).message
              : 'An unknown error occurred';

          // Check if the error code is 409 (Conflict) for email already registered
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (errorResponse.error && errorResponse.error.statusCode === 409) {
            this.notificationService.error(
              'Zadaný email je už zaregistrovaný, prosím prihláste sa.',
            );
            void this.router.navigate(['/auth/prihlasenie']); // Redirect to login
          } else {
            this.notificationService.error(errorMessage);
          }

          return throwError(() => new Error(errorMessage));
        }),
      )
      .subscribe();
  }

  /**
   * This method is used to toggle the button.
   * @param {number} buttonNumber - The button number.
   * @returns {void}
   */
  public toggleButton(buttonNumber: number): void {
    this.activeButton = buttonNumber; // Select the button
  }

  /**
   * Add titles before name
   * @param {string} title - title to add
   * @returns {void}
   */
  public removeTitlesBeforeName(title: string): void {
    const currentValue = this.titlesBeforeNameControl.value;
    const updatedValue = (currentValue ?? []).filter(
      (t: string) => t !== title,
    );
    this.titlesBeforeNameControl.setValue(updatedValue);
  }

  /**
   * Remove titles after name
   * @param {string} title - title to remove
   * @returns {void}
   */
  public removeTitlesAfterName(title: string): void {
    const currentValue = this.titlesAfterNameControl.value;
    const updatedValue = (currentValue ?? []).filter(
      (t: string) => t !== title,
    );
    this.titlesAfterNameControl.setValue(updatedValue);
  }

  public ageFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }

    const today = new Date();
    const minAgeDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate(),
    );

    return date <= minAgeDate;
  };

  /**
   * This method is used to get the result from the forms.
   * @returns {IParticipantRegisterData} - The participant register data.
   */
  // eslint-disable-next-line sonarjs/cognitive-complexity
  private getResults(): IParticipantRegisterData {
    const personalData = this.personalDataForm.value;
    const workData = this.workDataForm.value;
    const passwordData = this.passwordForm.value;
    const titlesBefore: string[] = this.titlesBeforeNameControl.value ?? [];
    const titlesAfter: string[] = this.titlesAfterNameControl.value ?? [];
    const newTitlesBefore =
      titlesBefore.length > 0 ? titlesBefore.join(' ') + ' ' : '';
    const newTitlesAfter: string =
      titlesAfter.length > 0 ? ', ' + titlesAfter.join(', ') : '';

    const participantRegisterData: IParticipantRegisterData = {
      email: this.email.value ?? '',
      password: passwordData.password ?? '',
      titlesBeforeName: newTitlesBefore,
      firstName: personalData.firstName ?? '',
      lastName: personalData.lastName ?? '',
      titlesAfterName: newTitlesAfter,
      birthDate: this.utilitiesService.toUtcSameDay(
        personalData.dateOfBirth ?? '',
      ),
      chamberId: workData.chamberId ?? '',
      phoneNumber: personalData.telephone ?? '',
      workplaceFullName: workData.workplaceFullName ?? '',
      workplaceStreet: workData.workplaceStreet ?? '',
      workplaceStreetNumber: workData.workplaceStreetNumber ?? '',
      workplaceZipCode: workData.workplaceZipCode ?? '',
      street: personalData.street ?? '',
      streetNumber: personalData.streetNumber ?? '',
      zipCode: personalData.zipCode ?? '',
      medicTypeId: workData.medicTypeId ?? '',
      medicalExpertiseId: workData.medicalExpertise ?? '',
      canPrescribeMedications: this.activeButton === 0 ? false : true,
      isSubscribedToNewsletter:
        this.agreementForm.value.newsletterAgreement ?? false,
      isInformedAboutEvents:
        this.agreementForm.value.acreditedInformationAgreement ?? false,
      hasAffidavit: this.agreementForm.value.realDataAgreement ?? false,
      hasConsentedToDataProcessing:
        this.agreementForm.value.personalDataAgreement ?? false,
      hasAcceptedTerms: this.agreementForm.value.termsAgreement ?? false,
      sex: personalData.gender ?? '',
    };
    return participantRegisterData;
  }

  /**
   * This method is called when the form is submitted.
   * @returns {void}
   */
  public onSubmit(): void {
    if (this.personalDataForm.valid && this.workDataForm.valid) {
      const participantRegisterData = this.getResults();
      this.registerService
        .registerParticipant(participantRegisterData)
        .pipe(
          take(1),
          tap(res => {
            this.store.dispatch(postAuthCredentials({ content: res }));
            this.notificationService.success('Registrácia bola úspešná');
            void this.router.navigate(['/user/event/upcoming']);
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
