import { Routes } from '@angular/router';
import { HomePageComponent } from '@jet/components/home-page/home-page.component';
import { LoginPageComponent } from '@jet/components/login-page/login-page.component';
import { LogoutPageComponent } from '@jet/components/logout-page/logout-page.component';
import { RegisterPageComponent } from '@jet/components/register-page/register-page.component';
import { ResetPasswordPageComponent } from '@jet/components/reset-password-page/reset-password-page.component';
import { SearchPageComponent } from '@jet/components/search-page/search-page.component';
import { ReportPageComponent } from '@jet/components/report-page/report-page.component';
import { ProfilePageComponent } from '@jet/components/profile-page/profile-page.component';
import { FareCalculatorPageComponent } from '@jet/components/fare-calculator-page/fare-calculator-page.component';
import { NotFoundPageComponent } from '@jet/components/not-found-page/not-found-page.component';
import { ReportHistoryPageComponent } from '@jet/components/report-history-page/report-history-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'fare-calculator', component: FareCalculatorPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LogoutPageComponent },
  {
    path: 'profile',
    children: [
      { path: '', component: ProfilePageComponent },
      { path: 'report-history', component: ReportHistoryPageComponent },
    ],
  },
  { path: 'register', component: RegisterPageComponent },
  { path: 'report', component: ReportPageComponent },
  { path: 'reset-password', component: ResetPasswordPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
