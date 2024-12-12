import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@jet/services/authentication/authentication.service';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-logout-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './logout-page.component.html',
  styleUrl: './logout-page.component.scss',
})
export class LogoutPageComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _authenticationService = inject(AuthenticationService);
  private readonly _loggerService = inject(LoggerService);

  public constructor() {
    this._loggerService.logComponentInitialization('LogoutPageComponent');
  }

  public ngOnInit(): void {
    this.logout();
  }

  public logout():void {
    this._authenticationService.logout().then(()=>{
      this._router.navigateByUrl('/')
    })
  }
}
