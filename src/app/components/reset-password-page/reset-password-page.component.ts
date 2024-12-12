import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '@jet/services/authentication/authentication.service';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';
import { PageComponent } from '../page/page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'jet-reset-password-page',
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
    TranslocoModule],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.scss',
})
export class ResetPasswordPageComponent implements OnInit {
  private readonly _router = inject(Router);
    private readonly _formBuilder = inject(FormBuilder);
  private readonly _authenticationService = inject(AuthenticationService);
  private readonly _loggerService = inject(LoggerService);
 
  public readonly resetPasswordFormGroup: FormGroup<{
    email: FormControl<string | null>;
  }>;
  
  public isResetPasswordPending: boolean;

  public constructor() {
    this.isResetPasswordPending = false;

    this.resetPasswordFormGroup = this._formBuilder.group({
      email: ''
     });

    this._loggerService.logComponentInitialization(
      'ResetPasswordPageComponent',
    );
  }

  public ngOnInit(): void {
    this._authenticationService.getUser().then(({data, error})=>{
      if(data.user){this._router.navigateByUrl('/')}
    })
  }

  public resetPassword(email: string):void {
    this.isResetPasswordPending = true;

    this._authenticationService.resetPassword(email)
    .then(({data, error})=>{
      if(error){console.log(error)}else{
        console.log(data);
        this._router.navigateByUrl('/login')
      }
    })
    .finally(()=>{this.isResetPasswordPending = false;})
  }
}
