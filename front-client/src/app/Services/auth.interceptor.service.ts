import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const token = localStorage.getItem('token');

  if (!token) {
    return next(req)
  }

  const newReq = req.clone({
    
    headers: req.headers.append('Authorization', `Bearer ${token}`)
  })

  return next(newReq)
}