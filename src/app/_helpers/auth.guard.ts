// auth.guard.ts
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../_services/token.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  // Vérifier si l'utilisateur est authentifié
  if (tokenService.isLogged()) {
    return true;
  } else {
    // Rediriger vers la page de connexion si non authentifié
    router.navigate(['auth']);
    return false;
  }
}
