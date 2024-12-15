import { inject } from '@angular/core';
import {
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
} from '@angular/router';
import { AuthenticationService } from '@jet/services/authentication/authentication.service';

export const isAuthenticatedGuard: CanActivateFn = (
  _activatedRouteSnapshot,
  routerStateSnapshot,
): MaybeAsync<GuardResult> => {
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);

  if (authenticationService.user() !== null) {
    return true;
  } else {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: routerStateSnapshot.url },
    });
  }
};
