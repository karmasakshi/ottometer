import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthenticationService } from '@jet/services/authentication/authentication.service';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';
import { PageComponent } from '../page/page.component';
import { NgStyle } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'jet-register-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgStyle,
    RouterLink,
    PageComponent,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    TranslocoModule,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _authenticationService = inject(AuthenticationService);
  private readonly _loggerService = inject(LoggerService);

  public readonly registerFormGroup: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  public isRegisterPending: boolean;

  public constructor() {
    this.registerFormGroup = this._formBuilder.group({
      email: '',
      password: '',
    });

    this.isRegisterPending = false;

    this._loggerService.logComponentInitialization('RegisterPageComponent');
  }

  public register(email: string, password: string): void {
    this.isRegisterPending = true;
    this._authenticationService
      .register(email, password)
      .then(({ data, error }): void => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          this._router.navigateByUrl('/');
        }
      })
      .finally(() => {
        this.isRegisterPending = false;
      });
  }
}
