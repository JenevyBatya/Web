import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  toMain() {
    this.router.navigate(['/main']).then(() =>
      location.reload())
  }
  toStarter() {
    this.router.navigate(['/starter']).then(() =>
      location.reload())
  }
  toSignup() {
    this.router.navigate(['/signup']).then(() =>
      location.reload())
  }
}
