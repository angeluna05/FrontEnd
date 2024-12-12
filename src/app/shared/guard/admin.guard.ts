// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
// import { Observable } from "rxjs";
// @Injectable({
//   providedIn: "root",
// })
// export class rd  {
//   constructor(public router: Router) {}

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     // Guard for user is login or not
//     let user = JSON.parse(localStorage.getItem("user"));
//     if (!user || user === null) {
//       this.router.navigate(["/auth/login"]);
//       return true;
//     } else if (user) {
//       if (!Object.keys(user).length) {
//         this.router.navigate(["/auth/login"]);
//         return true;
//       }
//     }
//     return true;
//   }
// }
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminGuard {
  // Lista de rutas que no requieren autenticación
  private unprotectedRoutes: string[] = ['/auth/login', '/authentication/forgot-password','/authentication/register/simple'];

  constructor(private router: Router) {}

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); // Devuelve true si el token existe, false si no
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Verificar si la ruta actual está en la lista de rutas permitidas
    const currentRoute = state.url;
    if (this.unprotectedRoutes.includes(currentRoute)) {
      return true; // Permitir acceso sin autenticación
    }

    if (this.isAuthenticated()) {
      return true; // Permitir acceso si está autenticado
    } else {
      // Si no está autenticado, lo redirigimos al login
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}

