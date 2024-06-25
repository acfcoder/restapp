import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  let clonedReq = req;

  const token = localStorage.getItem('access-token');

  if (localStorage.getItem('access-token')){
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  console.log ('send data');
  console.log (clonedReq);
  return next(clonedReq);
};
