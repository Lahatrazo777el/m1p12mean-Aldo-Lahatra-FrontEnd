import { AuthService } from '@/services/auth.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   // Inject the current `AuthService` and use it to get an authentication token:
   const authToken = inject(AuthService).getToken();
   if(authToken){

     // Clone the request to add the authentication header.
     const newReq = req.clone({
       headers: req.headers.append('authorization', `Bearer ${authToken}`),
     });

     return next(newReq);
   }

  return next(req);
};
