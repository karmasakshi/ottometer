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
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'jet-login-page',
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
    TranslocoModule]
    ,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly _formBuilder = inject(FormBuilder);
private readonly _router = inject(Router);
  private readonly _authenticationService = inject(AuthenticationService);
  private readonly _loggerService = inject(LoggerService);

  public readonly loginFormGroup: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  public isLoginPending: boolean;

  public constructor() {

    this.loginFormGroup = this._formBuilder.group({
     email: '',
     password: ''
    });
    this.isLoginPending = false;

    this._loggerService.logComponentInitialization('LoginPageComponent');
  }

  public login(email: string, password: string) {
    this.isLoginPending = true;
    this._authenticationService.login(email, password)
    .then(({data, error}):void=>{
      if(error){console.log(error)}else{
        this._router.navigateByUrl('/')
      }
    })
    .finally(()=>{
      this.isLoginPending = false;
    })
  }
}
