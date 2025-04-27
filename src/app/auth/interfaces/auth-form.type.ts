import { FormControl } from '@angular/forms';

export interface ILoginFormControl {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface IAuthFormControl {
  email: FormControl<string | null>;
  newPassword: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}
