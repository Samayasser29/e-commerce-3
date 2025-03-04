import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID); 
  let token = '';
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('userToken') || '';
  }

  
  console.log(req)

  if (token) {
    req = req.clone({
      setHeaders: {
        token: token
      }
    });
  }

 
 

  return next(req);
};
