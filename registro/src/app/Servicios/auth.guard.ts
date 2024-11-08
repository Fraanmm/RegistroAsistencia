import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticatorService } from './authenticator.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const authService = inject(AuthenticatorService);
  const router = inject(Router);

  if (authService.isConected()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};



