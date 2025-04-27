import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  IAbstractDialogData,
  IAbstractFormControl,
  IAbstractTextFormControl,
  ICoauthorsFormControl,
} from '@app/user/event-update/interfaces/event-update.interface';

/**
 * This component is used as an abstract dialog
 */
@Component({
  selector: 'summeet-abstract-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './abstract-dialog.component.html',
  styleUrl: './abstract-dialog.component.scss',
})
export class AbstractDialogComponent implements OnInit {
  public abstractForm!: FormGroup<IAbstractFormControl>;
  public abstractTextForm!: FormGroup<IAbstractTextFormControl>;
  public abstractTitle: FormControl<string | null> = new FormControl<string>(
    '',
    Validators.required,
  );

  private readonly dialogRef = inject(MatDialogRef<AbstractDialogComponent>);
  public readonly data = inject<IAbstractDialogData>(MAT_DIALOG_DATA);

  /**
   * This method is used to initialize the component
   * @returns {void}
   */
  public ngOnInit(): void {
    if (this.data) {
      this.putDataToForm();
    } else {
      this.abstractTextForm = new FormGroup<IAbstractTextFormControl>(
        {
          introduction: new FormControl('', Validators.required),
          target: new FormControl('', Validators.required),
          methodology: new FormControl('', Validators.required),
          results: new FormControl('', Validators.required),
          conclusion: new FormControl('', Validators.required),
        },
        {
          validators: this.lengthValidator,
          updateOn: 'change',
        },
      );
      this.abstractForm = new FormGroup<IAbstractFormControl>({
        conflicts: new FormControl('', Validators.required),
        keyword1: new FormControl('', Validators.required),
        keyword2: new FormControl('', Validators.required),
        keyword3: new FormControl('', Validators.required),
        keyword4: new FormControl(''),
        keyword5: new FormControl(''),
        coauthors: new FormArray<FormGroup<ICoauthorsFormControl>>([]),
      });
    }
  }

  /**
   * This method is used to put the data to the form
   * @returns {void}
   */
  private putDataToForm(): void {
    this.abstractTitle.setValue(this.data.title);
    this.abstractTextForm = new FormGroup<IAbstractTextFormControl>(
      {
        introduction: new FormControl(
          this.data.introduction,
          Validators.required,
        ),
        target: new FormControl(this.data.target, Validators.required),
        methodology: new FormControl(
          this.data.methodology,
          Validators.required,
        ),
        results: new FormControl(this.data.results, Validators.required),
        conclusion: new FormControl(this.data.conclusion, Validators.required),
      },
      {
        validators: this.lengthValidator,
        updateOn: 'change',
      },
    );
    this.abstractForm = new FormGroup<IAbstractFormControl>({
      conflicts: new FormControl(this.data.conflicts, Validators.required),
      keyword1: new FormControl(this.data.keyword1, Validators.required),
      keyword2: new FormControl(this.data.keyword2, Validators.required),
      keyword3: new FormControl(this.data.keyword3, Validators.required),
      keyword4: new FormControl(this.data.keyword4),
      keyword5: new FormControl(this.data.keyword5),
      coauthors: new FormArray<FormGroup<ICoauthorsFormControl>>(
        this.data.coauthors.map(
          coauthor =>
            new FormGroup<ICoauthorsFormControl>({
              firstName: new FormControl(
                coauthor.firstName,
                Validators.required,
              ),
              lastName: new FormControl(coauthor.lastName, Validators.required),
              workplaceFullName: new FormControl(
                coauthor.workplaceFullName,
                Validators.required,
              ),
            }),
        ),
      ),
    });
  }

  /**
   * This method is used to add a coauthor
   * @returns {void}
   */
  public addCoauthor(): void {
    const control = this.abstractForm.get('coauthors') as FormArray<
      FormGroup<ICoauthorsFormControl>
    >;
    if (control.length < 15) {
      control.push(
        new FormGroup<ICoauthorsFormControl>({
          firstName: new FormControl('', Validators.required),
          lastName: new FormControl('', Validators.required),
          workplaceFullName: new FormControl('', Validators.required),
        }),
      );
    }
  }

  /**
   * This method is used to delete a coauthor
   * @param {number} index - the index of the coauthor
   * @returns {void}
   */
  public deleteCoauthor(index: number): void {
    const control = this.abstractForm.get('coauthors') as FormArray<
      FormGroup<ICoauthorsFormControl>
    >;
    control.removeAt(index);
  }

  /**
   * Get the meal type
   * @description - Get the meal type
   * @returns {FormArray<FormGroup<ICoauthorsFormControl>>} - The array of meal type form groups
   */
  public getCoauthors(): FormArray<FormGroup<ICoauthorsFormControl>> {
    return this.abstractForm.get('coauthors') as FormArray<
      FormGroup<ICoauthorsFormControl>
    >;
  }

  /**
   * This method is used to create the abstract data
   * @returns {IAbstractDialogData} - the abstract data
   */
  private createAbstractData(): IAbstractDialogData {
    return {
      title: this.abstractTitle.value ?? '',
      introduction: this.abstractTextForm.get('introduction')?.value ?? '',
      target: this.abstractTextForm.get('target')?.value ?? '',
      methodology: this.abstractTextForm.get('methodology')?.value ?? '',
      results: this.abstractTextForm.get('results')?.value ?? '',
      conclusion: this.abstractTextForm.get('conclusion')?.value ?? '',
      conflicts: this.abstractForm.get('conflicts')?.value ?? '',
      keyword1: this.abstractForm.get('keyword1')?.value ?? '',
      keyword2: this.abstractForm.get('keyword2')?.value ?? '',
      keyword3: this.abstractForm.get('keyword3')?.value ?? '',
      keyword4: this.abstractForm.get('keyword4')?.value ?? '',
      keyword5: this.abstractForm.get('keyword5')?.value ?? '',
      coauthors:
        this.abstractForm.get('coauthors')?.value.map(coauthor => ({
          firstName: coauthor.firstName ?? '',
          lastName: coauthor.lastName ?? '',
          workplaceFullName: coauthor.workplaceFullName ?? '',
        })) ?? [],
    };
  }

  /**
   * This method is used to submit the form
   * @returns {void}
   */
  public onSubmit(): void {
    this.dialogRef.close(this.createAbstractData());
  }

  /**
   * This method validates the total word count across all fields in the form group.
   * @param {AbstractControl} control - the form group
   * @returns {ValidationErrors | null} - the error if the text exceeds the word limit
   */
  private lengthValidator(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup<IAbstractTextFormControl>;
    let totalWordCount = 0;

    for (const key in group.controls) {
      const fieldControl = group.get(key);
      if (fieldControl?.value) {
        const wordCount: number = (fieldControl.value as string)
          .trim()
          .split(/\s+/)
          .filter(Boolean).length;
        totalWordCount += wordCount;
      }
    }

    // Group-level error
    const hasGroupError = totalWordCount > 250;

    for (const key in group.controls) {
      const fieldControl = group.get(key);
      if (fieldControl) {
        // Get existing errors
        const existingErrors = fieldControl.errors || {};

        // Merge new error with existing ones
        if (hasGroupError) {
          fieldControl.setErrors({
            ...existingErrors,
            tooManyCharacters: true,
          });
        } else if (existingErrors['tooManyCharacters']) {
          delete existingErrors['tooManyCharacters'];
          fieldControl.setErrors(
            Object.keys(existingErrors).length > 0 ? existingErrors : null,
          );
        }
      }
    }

    return hasGroupError ? { tooManyCharacters: true } : null;
  }

  /**
   * This method is used to close the dialog
   */
  public closeDialog(): void {
    this.dialogRef.close(null);
  }
}
