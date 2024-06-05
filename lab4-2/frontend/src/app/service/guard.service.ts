import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) { }
  canActivate(): boolean {
    if (!this.authService.getIsLoggedIn()){
      this.router.navigate(['/starter']);
      return false;
    }
    return true;
  }
}
