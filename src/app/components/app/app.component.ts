import { Component, inject, Signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LoggerService } from '@jet/services/logger/logger.service';
import { User } from '@jet/interfaces/user.interface';
import { AuthenticationService } from '@jet/services/authentication/authentication.service';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'jet-app',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatToolbarModule,
    FooterComponent,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    MatDividerModule,
    TranslocoModule,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _authenticationService = inject(AuthenticationService);
  private readonly _breakpointObserver = inject(BreakpointObserver);
  private readonly _loggerService = inject(LoggerService);

  public readonly user: Signal<User | null>;

  public isHandset$: Observable<boolean> = this._breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  public constructor() {
    this.user = this._authenticationService.user;

    this._loggerService.logComponentInitialization('AppComponent');
  }
}
