import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'; // Importa JwtHelperService
const Swal = require('sweetalert2');

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      // Verificar si el token ha expirado
      if (this.jwtHelper.isTokenExpired(authToken)) {
        // Si el token ha expirado, eliminarlo de localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('rolName');
        localStorage.removeItem('correo');
        localStorage.removeItem('username');
        localStorage.removeItem('usuarioid');
        
        // Redirigir al login
        this.router.navigate(['/auth/login']);
      } else {
        // Si el token no ha expirado, agregarlo en la cabecera
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${authToken}`)
        });
        return next.handle(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401 || error.status === 403) {
              Swal.fire(
                'Ups...',
                'Acción no permitida.',
                'error'
              );
            }
            return throwError(error);
          })
        );
      }
    } else {
      // Si no hay token, pasar la solicitud sin modificación
      return next.handle(req);
    }
  }
}
