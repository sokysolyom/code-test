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
  UntypedFormControl,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
  ValidatorFn,
  AbstractControl,
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
  catchError,
  throwError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  takeUntil,
  BehaviorSubject,
  filter,
  take,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { WINDOW_REF } from '@app/core/utils/window-ref';
import { NotificationService } from '@app/core/services/notification.service';
import { RegisterService } from '@app/register/services/register.service';
import { IAppState } from '@app/state/app.state';
import {
  IAgreementFormControl,
  ILegalPersonFormControl,
  IPasswordFormControl,
  IPersonalDataFormControl,
} from '@app/register/interfaces/register-form.type';
import {
  ICountries,
  IMedicType,
  IRepresentativeRegisterData,
  ISubjectResponse,
  ITitleName,
  IZipCodeDto,
} from '@app/register/interfaces/register.type';
import { equalityValidator } from '@app/core/utils/validators/equality.validator';
import { Disposable } from '@app/core/utils/disposable';
import { registerRoleSelector } from '@app/state/register/register.selector';
import { ISelectOption } from '@app/user/event-update/interfaces/event-update.interface';
import { Sex } from '@app/shared/enums/sex.enum';
import { postAuthCredentials } from '@app/state/auth/auth.action';
import { Role } from '@app/shared/enums/role.enum';
import { UtilitiesService } from '@app/core/services/utilities.service';

const zipCodeFormatter = (zip: IZipCodeDto): string =>
  zip ? `${zip?.zipCode}, ${zip?.name}` : '';

/**
 * This component is used to display the representative register.
 */
@Component({
  selector: 'summeet-representative-register',
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
  templateUrl: './representative-register.component.html',
  styleUrls: ['./representative-register.component.scss'],
  providers: [provideNativeDateAdapter()],
})
export class RepresentativeRegisterComponent
  extends Disposable
  implements OnInit
{
  // Stepper
  @ViewChild('stepper') private myStepper!: MatStepper;
  // Zipcode
  @ViewChild('zipCodeInputNative', { static: false })
  public zipCodeInputNative!: ElementRef<HTMLInputElement>;
  @ViewChild('zipCodeSuggestionsAuto', { static: false })
  public zipCodeSuggestionsAuto!: MatAutocomplete;
  @ViewChild('countryInputNative', { static: false })
  public countryInputNative!: ElementRef<HTMLInputElement>;
  @ViewChild('countryAuto', { static: false })
  public countryAuto!: MatAutocomplete;
  public workplaceZipCodeSuggestions: IZipCodeDto[] = [];
  public zipCodeSuggestions: IZipCodeDto[] = [];
  // FormGroups
  public personalDataForm!: FormGroup<IPersonalDataFormControl>;
  public legalPersonForm!: FormGroup<ILegalPersonFormControl>;
  public agreementForm!: FormGroup<IAgreementFormControl>;
  public passwordForm!: FormGroup<IPasswordFormControl>;
  // FormControls
  public titlesBeforeNameControl = new FormControl<string[]>([]);
  public titlesAfterNameControl = new FormControl<string[]>([]);
  public isVatPayer = new FormControl<boolean>(false);
  public email: FormControl<string | null> = new FormControl<string | null>(
    '',
    Validators.compose([Validators.required, Validators.email]),
  );
  public countriesControl = new FormControl<string>('');
  // Variables
  public userType!: number;
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;
  public companySuggestions: ISubjectResponse[] = [];
  public selectedCompany!: ISubjectResponse;
  public titlesBeforeNameOptions!: ITitleName[];
  public titlesAfterNameOptions!: ITitleName[];
  public ncziTypes!: IMedicType[];
  public currentState: number | null = null;
  public isLinear: boolean = true;
  public isPartner: boolean = false;
  public currentRole: string = '';
  public genders: ISelectOption[] = [
    { value: Sex.MAN, viewValue: 'Muž' },
    { value: Sex.WOMAN, viewValue: 'Žena' },
  ];
  public selectedCountry!: ICountries[];
  public countriesSuggestions: ICountries[] = [];
  public isCountriesVisible$: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );
  public isSelectedCountry: boolean = false;
  public czActiveButton: number | null = null;
  public isCountrySelected: boolean = false;
  public currentFlag!: string;
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

  private readonly store = inject(Store<IAppState>);
  private readonly router = inject(Router);
  private readonly registerService = inject(RegisterService);
  private readonly notificationService = inject(NotificationService);
  private readonly window = inject(WINDOW_REF);
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly utilitiesService = inject(UtilitiesService);

  /**
   * This method is called when the component is initialized.
   */
  public ngOnInit(): void {
    this.store.select(registerRoleSelector).subscribe(role => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      this.isPartner = role === Role.PARTNER ? true : false;
      this.currentRole = role;
    });
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

    this.legalPersonForm = new FormGroup<ILegalPersonFormControl>({
      country: new FormControl<string | null>(null, Validators.required),
      name: new UntypedFormControl('', Validators.required),
      businessId: new FormControl<string | null>('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      street: new FormControl<string | null>({ value: null, disabled: true }),
      streetNumber: new FormControl<string | null>({
        value: null,
        disabled: true,
      }),
      zipCode: new FormControl<string | null>({ value: null, disabled: true }),
      city: new FormControl<string | null>({ value: null, disabled: true }),
      taxId: new FormControl<string | null>({ value: null, disabled: true }),
      vat: new FormControl<string | null>({ value: null, disabled: true }),
      registrationOffice: new FormControl<string | null>({
        value: null,
        disabled: true,
      }),
      registrationNumber: new FormControl<string | null>({
        value: null,
        disabled: true,
      }),
    });
    // If users text into the input, it calls the Digital Slovensko for suggestions
    this.legalPersonForm
      .get('name')!
      .valueChanges.pipe(
        takeUntil(this.destroySignal$),
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''),
        // eslint-disable-next-line sonarjs/function-return-type
        concatMap(value => {
          if (this.currentState === 3) {
            // Skip the backend call, clear suggestions
            this.companySuggestions = [];
            return []; // Return an empty observable
          }
          const state = this.currentState === 1 ? 'sk' : 'cz';
          return this.registerService.getLegalPersonsForm(state, {
            name: value ?? '',
          });
        }),
        map(res => (this.companySuggestions = res ?? [])),
      )
      .subscribe();

    // If users text into the input, it calls the Digital Slovensko for suggestions
    this.legalPersonForm
      .get('businessId')!
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''),
        concatMap(value => {
          const state = this.currentState === 1 ? 'sk' : 'cz';
          return value && value.length === 8 && /^\d*$/.test(value)
            ? //this.registerService.searchLegalPersonsFromApi(`cin:${value}`)
              this.registerService.getLegalPersonsForm(state, {
                businessId: value ?? '',
              })
            : of(null);
        }),
        map(res => {
          this.companySuggestions = res ?? [];
        }),
      )
      .subscribe();

    // Get titles before name method
    this.registerService.getTitlesBeforeName().subscribe(res => {
      this.titlesBeforeNameOptions = res;
    });
    // Get titles after name method
    this.registerService.getTitlesAfterName().subscribe(res => {
      this.titlesAfterNameOptions = res;
    });
    // Get NCZI types method
    this.registerService.getNCZI().subscribe(res => {
      this.ncziTypes = res;
    });
    // If users text into the input, it calls the BE for suggestions
    this.personalDataForm
      .get('zipCode')!
      .valueChanges.pipe(
        takeUntil(this.destroySignal$),
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''),
        concatMap(value => this.registerService.getZipCodes(value ?? '')),
        map(res => (this.zipCodeSuggestions = res)),
      )
      .subscribe();

    this.isCountriesVisible$
      .asObservable()
      .pipe(
        filter(res => res), // Proceed only if the field is visible
        concatMap(() => this.legalPersonForm.get('country')!.valueChanges),
        filter(res => !!res), // Proceed only if the field is filled
        debounceTime(300),
        distinctUntilChanged(),
        concatMap(res => this.registerService.getCountries(res ?? '')),
        map(res => {
          if (!this.isSelectedCountry) {
            // Mark field as dirty if not selected properly
            this.legalPersonForm.get('country')?.setErrors({ isDirty: true });
          }
          this.isSelectedCountry = false;

          // Register each country's flag dynamically
          for (const country of res) {
            this.iconRegistry.addSvgIconLiteral(
              country.displayName,
              // eslint-disable-next-line sonarjs/no-angular-bypass-sanitization
              this.sanitizer.bypassSecurityTrustHtml(country.flag), // Assuming `country.flag` contains the SVG string
            );
          }

          this.countriesSuggestions = res;
        }),
      )
      .subscribe();

    this.onResize({ target: { innerWidth: this.window.innerWidth } });
  }

  /**
   * This method is used to check if the user is a VAT payer.
   * @returns {void}
   */
  public onVatPayerChange(): void {
    const isVatPayer = this.isVatPayer.value;
    if (isVatPayer) {
      const vatData = this.legalPersonForm.get('taxId')?.value;
      this.legalPersonForm.get('vat')?.setValue(vatData ?? '');
    } else {
      this.legalPersonForm.get('vat')?.setValue('');
    }
  }

  /**
   * This method is used to get the result from autocomplete.
   * @param {MatAutocompleteSelectedEvent} e - The event object.
   * @returns {void}
   */
  public onCompanySelected(e: MatAutocompleteSelectedEvent): void {
    this.selectedCompany = e.option.value;
    const legalPersonNormalized = {
      name: this.selectedCompany.name,
      businessId: this.selectedCompany.businessId,
      street: this.selectedCompany.street,
      streetNumber: this.selectedCompany.streetNumber
        ? this.selectedCompany.streetNumber.toString()
        : undefined,
      zipCode: this.selectedCompany.zipCode,
      city: this.selectedCompany.city,
      taxId: this.selectedCompany.taxId
        ? this.selectedCompany.taxId.toString()
        : undefined,
      vat: this.selectedCompany.vat,
      registrationOffice: this.selectedCompany.registrationOffice,
      registrationNumber: this.selectedCompany.registrationNumber,
    };
    this.legalPersonForm.reset();
    this.legalPersonForm.patchValue(legalPersonNormalized);

    if (this.currentState === 1) {
      this.legalPersonForm.get('country')?.setValue('Slovenská republika');
    }

    if (this.currentState === 2) {
      this.legalPersonForm.get('country')?.setValue('Česká republika');
      this.onVatPayerChange();
    }

    if (this.czActiveButton === 1) {
      this.toggleCzButton(1);
    }
  }

  /**
   * This method is used to get the result from autocomplete.
   * @param {MatAutocompleteSelectedEvent} e - The event object.
   * @returns {void}
   */
  public onMedicalExpertiseSelected(e: MatAutocompleteSelectedEvent): void {
    this.isCountrySelected = true;
    const selectedCountry = e.option.value as ICountries;
    this.currentFlag = selectedCountry.officialNameSk; // Set the current flag to the country's display name
    this.iconRegistry.addSvgIconLiteral(
      selectedCountry.officialNameSk,
      // eslint-disable-next-line sonarjs/no-angular-bypass-sanitization
      this.sanitizer.bypassSecurityTrustHtml(selectedCountry.flag), // Assuming `country.flag` contains the SVG string
    );
    this.legalPersonForm.get('country')?.setErrors(null);
    this.isSelectedCountry = true;
    const formatedMedicalExpertise = selectedCountry.officialNameSk;
    this.countryInputNative.nativeElement.value = formatedMedicalExpertise;
    this.legalPersonForm
      .get('country')!
      .setValue(selectedCountry.officialNameSk, {
        emitModelToViewChange: false,
      });
  }

  /**
   * This method is used to display the medical expertise.
   * @param {IMedicType} value - The value.
   * @returns {string} - The formatted medical expertise.
   */
  public displaySelectedMedicalExpertise(value: ICountries): string {
    if (!value) {
      return '';
    }
    return value.displayName;
  }

  /**
   * This method is used to check the email.
   * @returns {void}
   */
  public checkEmail(): void {
    this.registerService
      .checkEmail(this.email.value!)
      .pipe(
        tap(() => {
          this.myStepper.next();
        }),
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
  //Display the ZipCode in correct form
  /**
   * This method is used to display the medical expertise.
   * @param {IZipCodeDto} value - The value.
   * @returns {string} - The formatted medical expertise.
   */
  public displaySelectedZipCode(value: IZipCodeDto): string {
    return zipCodeFormatter(value);
  }

  /**
   * This method is used to toggle the button.
   * @param {number} buttonNumber - The button number.
   * @returns {void}
   */
  public toggleCzButton(buttonNumber: number): void {
    this.czActiveButton = buttonNumber; // Select the button

    if (buttonNumber === 1) {
      const vatData = this.legalPersonForm.get('taxId')?.value;
      this.legalPersonForm.get('vat')?.setValue(vatData ?? '');
    } else {
      this.legalPersonForm.get('vat')?.setValue('');
    }
  }

  /**
   * This method is used to toggle the drugs prescribe button.
   * @param {number} state - The button number.
   * @returns {void}
   */
  public toggleStates(state: number): void {
    this.currentState = state; // Select the button
    this.legalPersonForm.reset();
    this.czActiveButton = null;
    this.isCountrySelected = false;

    if (state === 3) {
      this.isCountriesVisible$.next(true);
      this.legalPersonForm.get('country')?.enable();
      this.legalPersonForm.get('street')?.enable();
      this.legalPersonForm.get('streetNumber')?.enable();
      this.legalPersonForm.get('zipCode')?.enable();
      this.legalPersonForm.get('city')?.enable();
      this.legalPersonForm.get('taxId')?.enable();
      this.legalPersonForm.get('vat')?.enable();
      this.legalPersonForm.get('registrationOffice')?.enable();

      // Remove 'registrationNumber' from the form
      if (this.legalPersonForm.contains('registrationNumber')) {
        (this.legalPersonForm as FormGroup).removeControl('registrationNumber');
      }

      this.legalPersonForm.get('country')?.setValidators(Validators.required);
      this.legalPersonForm.get('street')?.setValidators(Validators.required);
      this.legalPersonForm
        .get('streetNumber')
        ?.setValidators(Validators.required);
      this.legalPersonForm.get('zipCode')?.setValidators(Validators.required);
      this.legalPersonForm.get('city')?.setValidators(Validators.required);
      this.legalPersonForm
        .get('registrationOffice')
        ?.setValidators(Validators.required);

      this.legalPersonForm.setValidators(this.taxIdOrVatRequired());
    } else {
      this.isCountriesVisible$.next(false);
      this.isSelectedCountry = false;
      this.legalPersonForm.get('country')?.disable();
      this.legalPersonForm.get('street')?.disable();
      this.legalPersonForm.get('streetNumber')?.disable();
      this.legalPersonForm.get('zipCode')?.disable();
      this.legalPersonForm.get('city')?.disable();
      this.legalPersonForm.get('taxId')?.disable();
      this.legalPersonForm.get('vat')?.disable();
      this.legalPersonForm.get('registrationOffice')?.disable();

      // Add 'registrationNumber' back to the form if not already added
      if (!this.legalPersonForm.contains('registrationNumber')) {
        this.legalPersonForm.addControl(
          'registrationNumber',
          new FormControl<string | null>({ value: null, disabled: true }),
        );
      }

      this.legalPersonForm.get('country')?.clearValidators();
      this.legalPersonForm.get('street')?.clearValidators();
      this.legalPersonForm.get('streetNumber')?.clearValidators();
      this.legalPersonForm.get('zipCode')?.clearValidators();
      this.legalPersonForm.get('city')?.clearValidators();
      this.legalPersonForm.get('taxId')?.clearValidators();
      this.legalPersonForm.get('vat')?.clearValidators();
      this.legalPersonForm.get('registrationOffice')?.clearValidators();
    }
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
   * This method is used to get the result from autocomplete.
   * @returns {IRepresentativeRegisterData} - The representative register data.
   */
  // eslint-disable-next-line sonarjs/cognitive-complexity
  private getResults(): IRepresentativeRegisterData {
    const personalData = this.personalDataForm.value;
    const passwordData = this.passwordForm.value;
    const titlesBefore: string[] = this.titlesBeforeNameControl.value ?? [];
    const titlesAfter: string[] = this.titlesAfterNameControl.value ?? [];
    const newTitlesBefore =
      titlesBefore.length > 0 ? titlesBefore.join(' ') + ' ' : '';
    const newTitlesAfter: string =
      titlesAfter.length > 0 ? ', ' + titlesAfter.join(', ') : '';
    const legalPerson = this.legalPersonForm.getRawValue();

    const representativeRegisterData: IRepresentativeRegisterData = {
      email: this.email.value ?? '',
      titlesBeforeName: newTitlesBefore,
      firstName: personalData.firstName ?? '',
      lastName: personalData.lastName ?? '',
      titlesAfterName: newTitlesAfter,
      birthDate: this.utilitiesService.toUtcSameDay(
        personalData.dateOfBirth ?? '',
      ),
      phoneNumber: personalData.telephone ?? '',
      sex: personalData.gender ?? '',
      street: personalData.street ?? '',
      streetNumber: personalData.streetNumber ?? '',
      zipCode: personalData.zipCode ?? '',
      isSubscribedToNewsletter:
        this.agreementForm.value.newsletterAgreement ?? false,
      isInformedAboutEvents:
        this.agreementForm.value.acreditedInformationAgreement ?? false,
      hasAffidavit: this.agreementForm.value.realDataAgreement ?? false,
      hasConsentedToDataProcessing:
        this.agreementForm.value.personalDataAgreement ?? false,
      hasAcceptedTerms: this.agreementForm.value.termsAgreement ?? false,
      password: passwordData.password ?? '',
      role: this.currentRole,
      legalPerson: {
        name: legalPerson.name ?? '',
        businessId: legalPerson.businessId ?? '',
        taxId: legalPerson.taxId ? legalPerson.taxId.toString() : '',
        vat: legalPerson.vat ?? '',
        street: legalPerson.street ?? '',
        streetNumber: legalPerson.streetNumber
          ? legalPerson.streetNumber.toString()
          : '',
        zipCode: legalPerson.zipCode ?? '',
        city: legalPerson.city ?? '',
        registrationOffice: legalPerson.registrationOffice ?? '',
        registrationNumber: legalPerson.registrationNumber ?? '',
        country: legalPerson.country ?? '',
      },
    };
    return representativeRegisterData;
  }

  /**
   * This method is used to check if the tax ID or VAT is required.
   * @returns {ValidatorFn} - The validator function.
   */
  public taxIdOrVatRequired(): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const taxId = formGroup.get('taxId')?.value;
      const vat = formGroup.get('vat')?.value;

      if (!taxId && !vat) {
        return { taxIdOrVatRequired: true }; // Error if neither is filled
      }
      return null; // Valid if at least one is filled
    };
  }

  /**
   * This method is used to get the result from the forms.
   *  @returns {void}
   */
  public onSubmit(): void {
    if (this.personalDataForm.valid && this.legalPersonForm.valid) {
      const representativeRegisterData = this.getResults();

      this.registerService
        .registerSubject(representativeRegisterData)
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
