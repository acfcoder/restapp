import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  let clonedReq = req;

  if (localStorage.getItem('access-token')){
    clonedReq = req.clone({
      setHeaders: {
        Authorization: localStorage.getItem('access-token')!
      }
    })
      console.log ('Nueva cabecera enviada')
    }

  return next(clonedReq);
};
