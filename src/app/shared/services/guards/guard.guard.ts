import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { take, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      take(1),  // Asegura que solo tomamos el primer valor emitido por el observable
      map(isAuthenticated => {
        if (!isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/login']);  // Redirige si no está autenticado
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return [false];
      })
    );
  }
}
