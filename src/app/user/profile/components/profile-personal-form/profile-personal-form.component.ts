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
import { MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  concatMap,
  map,
  catchError,
  throwError,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from '@app/core/services/utilities.service';
import {
  ITitleName,
  IZipCodeDto,
} from '@app/register/interfaces/register.type';
import { RegisterService } from '@app/register/services/register.service';
import { Sex } from '@app/shared/enums/sex.enum';
import { NotificationService } from '@app/core/services/notification.service';
import {
  IPersonalStatements,
  ISelectOption,
  IUserInfoPutData,
} from '../../interfaces/profile-personal-statements.interface';
import { ProfileService } from '../../services/profile.service';

/**
 * This component is used to display the profile personal form.
 */
@Component({
  selector: 'summeet-profile-personal-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    CommonModule,
    MatDatepickerModule,
    MatAutocompleteModule,
  ],
  templateUrl: './profile-personal-form.component.html',
  styleUrl: './profile-personal-form.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class ProfilePersonalFormComponent implements OnInit, AfterViewInit {
  public personalDataForm!: FormGroup<IPersonalStatements>;
  public titlesBeforeNameControl = new FormControl<string[]>([]);
  public titlesAfterNameControl = new FormControl<string[]>([]);
  public titlesBeforeNameOptions!: ITitleName[];
  public titlesAfterNameOptions!: ITitleName[];
  public genders: ISelectOption[] = [
    { value: Sex.MAN, viewValue: 'Muž' },
    { value: Sex.WOMAN, viewValue: 'Žena' },
  ];
  @ViewChild('zipCodeInputNative', { static: false })
  public zipCodeInputNative!: ElementRef<HTMLInputElement>;
  @ViewChild('zipCodeSuggestionsAuto', { static: false })
  public zipCodeSuggestionsAuto!: MatAutocomplete;
  public zipCodeSuggestions: IZipCodeDto[] = [];
  public startDate = new Date(
    new Date().getFullYear() - 18,
    new Date().getMonth(),
    new Date().getDate(),
  );

  private readonly registerService = inject(RegisterService);
  private readonly profileService = inject(ProfileService);
  private readonly utilitiesService = inject(UtilitiesService);
  private readonly notificationService = inject(NotificationService);

  /**
   * Initializes the component.
   * This method is called when the component is created.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.personalDataForm = new FormGroup<IPersonalStatements>({
      firstName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      email: new FormControl<string>({ value: '', disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      telephone: new FormControl<string>('', Validators.required),
      dateOfBirth: new FormControl<string>(''),
      gender: new FormControl<string>('', Validators.required),
      street: new FormControl<string>('', Validators.required),
      streetNumber: new FormControl<string>('', Validators.required),
      zipCode: new FormControl<string>('', Validators.required),
    });

    // Get titles before name method
    this.registerService.getTitlesBeforeName().subscribe(res => {
      this.titlesBeforeNameOptions = res;
    });
    // Get titles after name method
    this.registerService.getTitlesAfterName().subscribe(res => {
      this.titlesAfterNameOptions = res;
    });
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
  }

  /**
   * This method is called after the view has been initialized.
   * @returns {void}
   */
  public ngAfterViewInit(): void {
    this.profileService
      .info()
      .pipe(
        map(data => {
          this.personalDataForm.patchValue({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            telephone: data.phoneNumber,
            dateOfBirth: data.birthDate,
            gender: data.sex,
            street: data.street,
            streetNumber: data.streetNumber,
          });
          this.personalDataForm
            .get('zipCode')!
            .setValue(data.zipCode, { emitModelViewChange: false });
          this.zipCodeInputNative.nativeElement.value = data.zipCode;
          this.titlesBeforeNameControl.setValue(
            this.getTitlesBefore(data.titlesBeforeName),
          );
          this.titlesAfterNameControl.setValue(
            this.getTitlesBefore(data.titlesAfterName),
          );
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
   * Get titles before name
   * @param {string} titles - title to add
   * @returns {string[]} - updated titles
   */
  private getTitlesBefore(titles: string): string[] {
    return titles
      .split(',')
      .map(title => title.trim()) // Remove leading/trailing spaces
      .filter(title => title !== ''); // Exclude empty entries
  }

  /**
   * Get titles after name
   * @param {string} titles - title to add
   * @returns {string[]} - updated titles
   */
  private getTitlesAfter(titles: string): string[] {
    const arr = titles.replaceAll(/\s/g, '');
    const splittedTitles = arr.split(',');
    return splittedTitles;
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
    const formattedZipCode =
      this.utilitiesService.zipCodeFormatter(selectedZipCode);

    // Update the form control's value and prevent emitting change events.
    this.personalDataForm
      .get('zipCode')!
      .setValue(formattedZipCode, { emitEvent: false });

    // Update the native input value to ensure it reflects the formatted value.
    this.zipCodeInputNative.nativeElement.value = formattedZipCode;
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
   * This method is used to submit the form.
   * @returns {void}
   */
  public onSubmit(): void {
    if (this.personalDataForm.valid) {
      const titlesBefore: string[] = this.titlesBeforeNameControl.value ?? [];
      const titlesAfter: string[] = this.titlesAfterNameControl.value ?? [];
      const newTitlesBefore =
        titlesBefore.length > 0 ? titlesBefore.join(' ') + ' ' : '';
      const newTitlesAfter: string =
        titlesAfter.length > 0 ? ', ' + titlesAfter.join(', ') : '';
      // Submit the form
      const data: IUserInfoPutData = {
        titlesBeforeName: newTitlesBefore,
        firstName: this.personalDataForm.get('firstName')!.value ?? '',
        lastName: this.personalDataForm.get('lastName')!.value ?? '',
        titlesAfterName: newTitlesAfter,
        birthDate: this.utilitiesService.toUtcSameDay(
          this.personalDataForm.get('dateOfBirth')!.value ?? '',
        ),
        sex: this.personalDataForm.get('gender')!.value ?? '',
        phoneNumber: this.personalDataForm.get('telephone')!.value ?? '',
        street: this.personalDataForm.get('street')!.value ?? '',
        streetNumber: this.personalDataForm.get('streetNumber')!.value ?? '',
        zipCode: this.personalDataForm.get('zipCode')!.value ?? '',
      };
      this.profileService
        .putInfo(data)
        .pipe(
          map(() => {
            this.notificationService.success(
              'Osobné údaje boli úspešne uložené',
            );
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
