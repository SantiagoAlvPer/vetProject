import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Espera hasta que el estado de autenticación esté completamente listo
     return this.authService.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return of(true); // Permite el acceso si el usuario está autenticado
        } else {
          this.router.navigate(['/login']);  // Redirige si no está autenticado
          return of(false); // Bloquea el acceso si no está autenticado
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);  // Redirige en caso de error
        return of(false);
      })
    );
  }
}
