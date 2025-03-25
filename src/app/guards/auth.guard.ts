import { AuthService } from '@/services/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if(!auth.isLoggedIn()) {
    auth.logout();
    
    router.navigateByUrl('/login')
    return false
  }
  
  return true;
};
