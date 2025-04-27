import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap,
  throwError,
} from 'rxjs';
import {
  IParticipantInfoData,
  IParticipantPatchData,
} from '@app/user/participant/interfaces/participant.interface';
import { ParticipantService } from '@app/user/participant/services/participant.service';
import { NotificationService } from '@app/core/services/notification.service';
import { IMedicType } from '@app/register/interfaces/register.type';
import { RegisterService } from '@app/register/services/register.service';

const medicalExpertiseFormatter = (type: IMedicType): string =>
  type ? `${type?.abbreviation} ${type?.name}` : '';
/**
 * This component is used to add a medical expertise.
 */
@Component({
  selector: 'summeet-add-medical-expertise-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
  ],
  templateUrl: './add-medical-expertise-dialog.component.html',
  styleUrls: ['./add-medical-expertise-dialog.component.scss'],
})
export class AddMedicalExpertiseDialogComponent implements OnInit {
  @ViewChild('medicalExpertiseInputNative', { static: false })
  public medicalExpertiseInputNative!: ElementRef<HTMLInputElement>;
  @ViewChild('medicalExpertiseAuto', { static: false })
  public medicalExpertiseAuto!: MatAutocomplete;
  public medicalExpertiseId: FormControl<string | null> = new FormControl<
    string | null
  >('', Validators.required);
  public medicalExpertiseTypes: IMedicType[] = [];
  public medicalExptertiseSuggestions!: IMedicType[];
  public participantData!: IParticipantInfoData;
  public isSelectedMedicalExpertise: boolean = false;

  private readonly dialogRef = inject(
    MatDialogRef<AddMedicalExpertiseDialogComponent>,
  );
  private readonly registerService = inject(RegisterService);
  private readonly participantService = inject(ParticipantService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    // Get Medical Expertise types method
    this.registerService
      .getMedicalExpertise()
      .pipe(
        // Filter out the unknown medical expertise
        map(res => res.filter(me => me.abbreviation !== '444')),
        map(res => {
          this.medicalExpertiseTypes = res;
          this.medicalExptertiseSuggestions = res;
        }),
      )
      .subscribe();

    // If user text into the input, give him recommendations
    this.medicalExpertiseId.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''),
        map(res => {
          if (this.isSelectedMedicalExpertise) {
            this.isSelectedMedicalExpertise = false;
          } else {
            this.medicalExpertiseId?.setErrors({ isDirty: true });
            if (res) {
              const value = res.toLowerCase();
              const filteredItems = this.medicalExpertiseTypes.filter(
                me =>
                  me.name.toLowerCase().includes(value) ||
                  me.abbreviation.toLowerCase().includes(value),
              );
              this.medicalExptertiseSuggestions = filteredItems;
            } else {
              this.medicalExptertiseSuggestions = this.medicalExpertiseTypes;
            }
          }
        }),
      )
      .subscribe();

    // Get Participant Data method
    this.participantService.getParticipantData().subscribe(res => {
      this.participantData = res;
    });
  }

  /**
   * This method is called when the user selects a medical expertise.
   * @param {MatAutocompleteSelectedEvent} e - The event.
   * @returns {void}
   */
  public onMedicalExpertiseSelected(e: MatAutocompleteSelectedEvent): void {
    const selectedMedicalExpertise = e.option.value as IMedicType;
    this.medicalExpertiseId?.setErrors(null);
    this.isSelectedMedicalExpertise = true;
    const formatedMedicalExpertise = medicalExpertiseFormatter(
      selectedMedicalExpertise,
    );
    this.medicalExpertiseInputNative.nativeElement.value =
      formatedMedicalExpertise;
    this.medicalExpertiseId.setValue(selectedMedicalExpertise.id, {
      emitModelToViewChange: false,
    });
  }
  //Display the ZipCode in correct form
  /**
   * This method is used to display the selected medical expertise.
   * @param {IMedicType} value - The value.
   * @returns {string} - The formatted value.
   */
  public displaySelectedMedicalExpertise(value: IMedicType): string {
    return medicalExpertiseFormatter(value);
  }

  /**
   * This method is called when the user submits the form.
   * @returns {void}
   */
  public onSubmit(): void {
    const participantPatchData: IParticipantPatchData = {
      email: this.participantData.authUser.email,
      titlesBeforeName: this.participantData.titlesBeforeName,
      firstName: this.participantData.firstName,
      lastName: this.participantData.lastName,
      titlesAfterName: this.participantData.titlesAfterName,
      birthDate: this.participantData.birthDate,
      chamberId: this.participantData.chamberId,
      phoneNumber: this.participantData.phoneNumber,
      workplaceFullName: this.participantData.workplaceFullName,
      workplaceStreet: this.participantData.workplaceStreet,
      workplaceStreetNumber: this.participantData.workplaceStreetNumber,
      workplaceZipCode: this.participantData.workplaceZipCode,
      street: this.participantData.street,
      streetNumber: this.participantData.streetNumber,
      zipCode: this.participantData.zipCode,
      medicTypeId: this.participantData.medicType.id,
      canPrescribeMedications: this.participantData.canPrescribeMedications,
      newsletter: this.participantData.newsletter,
      medicalExpertiseId: this.medicalExpertiseId.value ?? '',
    };

    this.participantService
      .patchParticipantData(participantPatchData)
      .pipe(
        tap(() => {
          this.notificationService.success(
            'Odborná spôsobilosť bola úspešne pridaná',
          );
          this.dialogRef.close();
          void this.router.navigate(['/user/events']);
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
